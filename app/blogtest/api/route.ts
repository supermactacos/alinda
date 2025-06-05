import { NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';

// Initialize the Notion API client
const notion = new NotionAPI();

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
    
    // Return the record map as JSON
    return NextResponse.json({ recordMap });
  } catch (error: any) {
    console.error('Error fetching Notion page:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Notion page' },
      { status: 500 }
    );
  }
}

interface NotionPageBlock {
  id: string;
  title: string;
  createdTime: number;
  publishedDate?: string;
  thumbnail?: string;
  coverImage?: string;
  icon?: string;
  debug?: {
    propertyData?: any;
    rawThumbnailValue?: any;
  };
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
function convertAttachmentToUrl(attachmentString: string, pageId: string, spaceId?: string): string | undefined {
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
    // Example: https://notion.so/image/attachment%3A{attachmentId}%3A{filename}?id={pageId}&table=block&spaceId={spaceId}&width=600&cache=v2
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
        
        // Add more format handlers as needed
      }
    }
  }
  
  // Debug: Log all properties to help identify date properties
  console.log('All properties for debugging:', JSON.stringify(block.value.properties, null, 2));
  
  return undefined;
}

// Extract thumbnail from Notion property containing file attachments
function extractThumbnailFromProperties(block: NotionBlock, pageId: string): { url?: string; debug?: any } {
  // Check if properties exist
  if (!block.value?.properties) return {};
  
  const debugData: any = {};
  
  // Try to find image files in any property
  for (const [propName, propValue] of Object.entries(block.value.properties)) {
    // Skip the title property
    if (propName === 'title') continue;
    
    debugData[propName] = propValue;
    
    // Check if this property has file data
    if (Array.isArray(propValue)) {
      for (const item of propValue) {
        // Try to extract the file URL regardless of the exact structure
        let fileUrl = findImageUrlInNestedArray(item);
        
        // Handle attachment format
        if (fileUrl && fileUrl.startsWith('attachment:')) {
          const properUrl = convertAttachmentToUrl(fileUrl, pageId);
          if (properUrl) {
            return { 
              url: properUrl, 
              debug: { 
                propertyName: propName, 
                propertyValue: propValue, 
                foundIn: item, 
                originalAttachment: fileUrl 
              } 
            };
          }
        } else if (fileUrl) {
          return { url: fileUrl, debug: { propertyName: propName, propertyValue: propValue, foundIn: item } };
        }
      }
    }
  }
  
  return { debug: debugData };
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

// Add a new endpoint for database content
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
    
    // Extract space ID for generating image URLs
    const spaceId = recordMap.space ? Object.keys(recordMap.space)[0] : undefined;
    
    // Find the collection view
    const collectionViews = recordMap.collection_view || {};
    const collectionViewIds = Object.keys(collectionViews);
    
    if (collectionViewIds.length === 0) {
      return NextResponse.json(
        { error: 'No database view found' },
        { status: 404 }
      );
    }
    
    // Extract blocks which should contain the database items
    const blocks = recordMap.block || {};
    const pageBlocks: NotionPageBlock[] = [];
    
    // Look for blocks that represent pages in the database
    for (const [id, block] of Object.entries(blocks)) {
      // Check if this block is a page and belongs to the collection
      if (block.value && block.value.type === 'page' && block.value.parent_id === collectionId) {
        // Try to extract attachment thumbnail from properties first
        const { url: attachmentThumbnail, debug: attachmentDebug } = extractThumbnailFromProperties(block as NotionBlock, id);
        
        // Extract published date if available
        const publishedDate = extractPublishedDate(block as NotionBlock);
        
        // Extract cover image if available
        const coverImage = block.value.format?.page_cover;
        
        // Extract icon if available
        const icon = block.value.format?.page_icon;
        
        // Try to fetch the first image in the page content as fallback
        const contentThumbnail = extractFirstImageFromBlocks(recordMap, id);
        
        // Process cover image if it's an attachment
        let processedCoverImage = coverImage;
        if (coverImage && coverImage.startsWith('attachment:')) {
          processedCoverImage = convertAttachmentToUrl(coverImage, id);
        } else if (coverImage && coverImage.startsWith('/')) {
          processedCoverImage = `https://www.notion.so${coverImage}`;
        }
        
        // Determine the best thumbnail to use (prioritize attachments)
        const thumbnail = attachmentThumbnail || processedCoverImage || contentThumbnail || icon;
        
        const title = block.value.properties?.title?.[0]?.[0] || 'Untitled';
        
        // Save all properties for debugging
        const allProperties = block.value.properties ? { ...block.value.properties } : {};
        
        pageBlocks.push({
          id,
          title: typeof title === 'string' ? title : 'Untitled',
          createdTime: block.value.created_time,
          publishedDate,
          thumbnail: thumbnail,
          coverImage: processedCoverImage,
          icon: icon || undefined,
          debug: {
            propertyData: {
              ...attachmentDebug,
              allProperties
            },
            rawThumbnailValue: attachmentThumbnail || coverImage || contentThumbnail || icon
          }
        });
      }
    }
    
    return NextResponse.json({ 
      database: {
        title: collection?.name || 'Untitled Database',
        pages: pageBlocks
      },
      recordMap 
    });
  } catch (error: any) {
    console.error('Error fetching Notion database:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Notion database' },
      { status: 500 }
    );
  }
} 