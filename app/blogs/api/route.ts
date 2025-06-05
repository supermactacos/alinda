import { NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';

// Initialize the Notion API client
const notion = new NotionAPI();

interface NotionPageBlock {
  id: string;
  title: string;
  createdTime: number;
  publishedDate?: string;
  thumbnail?: string;
  coverImage?: string;
  icon?: string;
}

interface NotionBlock {
  value: {
    type: string;
    id: string;
    parent_id: string;
    properties?: {
      source?: string[][];
      title?: string[][];
      [key: string]: any;
    };
    format?: {
      page_cover?: string;
      page_icon?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

// Extended interface for recordMap including space
interface NotionRecordMap extends ExtendedRecordMap {
  space?: {
    [key: string]: any;
  };
}

// Convert attachment format to proper Notion URL
function convertAttachmentToUrl(attachmentString: string, pageId: string): string | undefined {
  // Check if it's an attachment format
  if (!attachmentString.startsWith('attachment:')) {
    return attachmentString;
  }
  
  try {
    // Format: attachment:{attachment-id}:{filename}
    const parts = attachmentString.split(':');
    if (parts.length < 3) return undefined;
    
    const attachmentId = parts[1];
    const filename = parts.slice(2).join(':'); // In case filename has colons
    
    // Create a URL format that Notion uses for images
    return `https://notion.so/image/attachment%3A${encodeURIComponent(attachmentId)}%3A${encodeURIComponent(filename)}?id=${pageId}&table=block&width=600&cache=v2`;
  } catch (error) {
    console.error('Error converting attachment to URL:', error);
    return undefined;
  }
}

// Extract the first image URL from a page's blocks
function extractFirstImageFromBlocks(recordMap: any, pageId: string): string | undefined {
  const blocks = recordMap.block || {};
  
  // Get all blocks that belong to this page
  for (const [id, block] of Object.entries(blocks)) {
    // Skip the page block itself
    if (id === pageId) continue;
    
    // Check if this block belongs to the page
    if ((block as NotionBlock).value && (block as NotionBlock).value.parent_id === pageId) {
      // Check if it's an image block
      if ((block as NotionBlock).value.type === 'image') {
        const source = (block as NotionBlock).value.properties?.source?.[0]?.[0];
        if (source) return source;
      }
      
      // Check if it's a file block with an image
      if ((block as NotionBlock).value.type === 'file' && (block as NotionBlock).value.properties?.source?.[0]?.[0]) {
        const source = (block as NotionBlock).value.properties?.source?.[0]?.[0];
        if (source && typeof source === 'string' && 
            (source.includes('.png') || source.includes('.jpg') || 
             source.includes('.jpeg') || source.includes('.gif'))) {
          return source;
        }
      }
    }
  }
  
  return undefined;
}

// Extract date property from Notion properties
function extractPublishedDate(block: NotionBlock): string | undefined {
  // Check if properties exist
  if (!block.value?.properties) return undefined;
  
  // Look through all properties to find date fields
  for (const [propName, propValue] of Object.entries(block.value.properties)) {
    // Skip non-array properties
    if (!Array.isArray(propValue)) continue;
    
    // Check if this property looks like a date property
    const isDateProperty = propName === 'I_fZ' || // Published Date property ID
                          propName === 'x_Vq' ||  // Due Date property ID
                          propName.toLowerCase().includes('date') || 
                          propName.toLowerCase().includes('publish');
    
    if (isDateProperty) {
      for (const item of propValue) {
        // Handle different date property formats
        
        // Format 1: [["2025-05-03"]] - Direct date string
        if (Array.isArray(item) && typeof item[0] === 'string' && 
            (item[0].match(/^\d{4}-\d{2}-\d{2}$/) || // YYYY-MM-DD
             item[0].match(/^\d{1,2}\/\d{1,2}\/\d{4}$/))) { // M/D/YYYY
          return item[0];
        }
        
        // Format 2: [["‣", [["d", {"type": "date", "start_date": "2025-05-06"}]]]]
        if (Array.isArray(item) && item.length > 1 && Array.isArray(item[1])) {
          for (const subItem of item[1]) {
            if (Array.isArray(subItem) && subItem[0] === 'd' && 
                subItem[1] && typeof subItem[1] === 'object') {
              const dateObj = subItem[1];
              if (dateObj.start_date) {
                return dateObj.start_date;
              }
            }
          }
        }
      }
    }
  }
  
  return undefined;
}

// Extract thumbnail from Notion property containing file attachments
function extractThumbnailFromProperties(block: NotionBlock, pageId: string): string | undefined {
  // Check if properties exist
  if (!block.value?.properties) return undefined;
  
  // Try to find image files in any property
  for (const [propName, propValue] of Object.entries(block.value.properties)) {
    // Skip the title property
    if (propName === 'title') continue;
    
    // Check if this property has file data
    if (Array.isArray(propValue)) {
      for (const item of propValue) {
        // Try to extract the file URL regardless of the exact structure
        let fileUrl = findImageUrlInNestedArray(item);
        
        // Handle attachment format
        if (fileUrl && fileUrl.startsWith('attachment:')) {
          const properUrl = convertAttachmentToUrl(fileUrl, pageId);
          if (properUrl) {
            return properUrl;
          }
        } else if (fileUrl) {
          return fileUrl;
        }
      }
    }
  }
  
  return undefined;
}

// Recursively search for an image URL in a nested array structure
function findImageUrlInNestedArray(data: any): string | undefined {
  // If it's a string that looks like an image URL, return it
  if (typeof data === 'string') {
    if (data.startsWith('http') && 
        (data.includes('.png') || data.includes('.jpg') || 
         data.includes('.jpeg') || data.includes('.gif'))) {
      return data;
    }
    
    // Also detect attachment format
    if (data.startsWith('attachment:')) {
      return data;
    }
    
    return undefined;
  }
  
  // If it's an array, check each element
  if (Array.isArray(data)) {
    for (const item of data) {
      const result = findImageUrlInNestedArray(item);
      if (result) return result;
    }
  }
  
  // If it's an object, check each value
  if (data && typeof data === 'object') {
    for (const key in data) {
      const result = findImageUrlInNestedArray(data[key]);
      if (result) return result;
    }
  }
  
  return undefined;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { databaseId } = body;
    
    if (!databaseId) {
      return NextResponse.json(
        { error: 'Missing databaseId parameter' },
        { status: 400 }
      );
    }
    
    // Fetch the database page
    const recordMap = await notion.getPage(databaseId) as NotionRecordMap;
    
    // Extract database items
    const collections = recordMap.collection || {};
    const collectionIds = Object.keys(collections);
    
    if (collectionIds.length === 0) {
      return NextResponse.json(
        { error: 'No database found on this page' },
        { status: 404 }
      );
    }
    
    const collectionId = collectionIds[0];
    const collection = collections[collectionId]?.value;
    
    // Find the collection view
    const collectionViews = recordMap.collection_view || {};
    const collectionViewIds = Object.keys(collectionViews);
    
    if (collectionViewIds.length === 0) {
      return NextResponse.json(
        { error: 'No database view found' },
        { status: 404 }
      );
    }
    
    // Get database title
    const databaseTitle = collection?.name?.[0]?.[0] || 'Notion Database';
    
    // Process blocks to find pages in the database
    const blocks = recordMap.block || {};
    const pages: NotionPageBlock[] = [];
    
    // Find all page blocks that are children of this database
    for (const [id, block] of Object.entries(blocks)) {
      if (id === databaseId) continue; // Skip the database block itself
      
      const value = (block as NotionBlock).value;
      
      // Check if it's a page block and a child of our database
      if (value?.type === 'page' && value?.parent_id === databaseId) {
        // Extract title
        let title = 'Untitled';
        if (value.properties?.title) {
          const titleArr = value.properties.title;
          if (Array.isArray(titleArr) && titleArr.length > 0 && Array.isArray(titleArr[0])) {
            title = titleArr[0][0] || 'Untitled';
          }
        }
        
        // Extract creation time
        const createdTime = value.created_time || Date.now();
        
        // Try to find a published date
        const publishedDate = extractPublishedDate(block as NotionBlock);
        
        // Extract cover image if available
        let coverImage = undefined;
        if (value.format?.page_cover) {
          if (value.format.page_cover.startsWith('/')) {
            coverImage = `https://www.notion.so${value.format.page_cover}`;
          } else {
            coverImage = value.format.page_cover;
          }
        }
        
        // Try to get a thumbnail from other properties
        let thumbnail = extractThumbnailFromProperties(block as NotionBlock, id);
        
        // If no thumbnail found in properties, try to get the first image in the page content
        if (!thumbnail && !coverImage) {
          thumbnail = extractFirstImageFromBlocks(recordMap, id);
        }
        
        // If we have a cover image but no thumbnail, use the cover as thumbnail
        if (!thumbnail && coverImage) {
          thumbnail = coverImage;
        }
        
        // Create the page object
        pages.push({
          id,
          title,
          createdTime,
          publishedDate,
          thumbnail,
          coverImage
        });
      }
    }
    
    // Sort pages by date - newest first
    pages.sort((a, b) => {
      // If both have published dates, use those
      if (a.publishedDate && b.publishedDate) {
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
      
      // If only one has a published date, prioritize it
      if (a.publishedDate) return -1;
      if (b.publishedDate) return 1;
      
      // Fallback to created time
      return b.createdTime - a.createdTime;
    });
    
    // Return the database information and pages
    return NextResponse.json({ 
      database: {
        id: databaseId,
        title: databaseTitle,
        pages
      } 
    });
  } catch (error: any) {
    console.error('Error processing Notion database:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process Notion database' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Get the page ID from the query parameters
    const url = new URL(request.url);
    const pageId = url.searchParams.get('pageId');
    
    if (!pageId) {
      return NextResponse.json(
        { error: 'Missing pageId parameter' },
        { status: 400 }
      );
    }
    
    // Fetch the Notion page
    const recordMap = await notion.getPage(pageId);
    
    // Process the page data to extract important information
    const block = recordMap.block[pageId];
    let pageData = null;
    
    if (block) {
      // Extract title from properties
      let title = 'Untitled';
      if (block.value?.properties?.title) {
        const titleArr = block.value.properties.title;
        if (Array.isArray(titleArr) && titleArr.length > 0 && Array.isArray(titleArr[0])) {
          title = titleArr[0][0] || 'Untitled';
        }
      }
      
      // Extract cover image if available
      let coverImage = null;
      if (block.value?.format?.page_cover) {
        const coverImagePath = block.value.format.page_cover;
        if (coverImagePath.startsWith('/')) {
          coverImage = `https://www.notion.so${coverImagePath}`;
        } else if (coverImagePath.startsWith('http')) {
          coverImage = coverImagePath;
        }
      }
      
      pageData = {
        id: pageId,
        title,
        coverImage,
        createdTime: block.value?.created_time || Date.now(),
        lastEditedTime: block.value?.last_edited_time || Date.now()
      };
    }
    
    // Return the record map and processed page data
    return NextResponse.json({ 
      recordMap,
      page: pageData
    });
  } catch (error: any) {
    console.error('Error fetching Notion page:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Notion page' },
      { status: 500 }
    );
  }
} 