import { NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';

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
        } else if (coverImagePath.startsWith('attachment:')) {
          // Handle attachment format
          const parts = coverImagePath.split(':');
          if (parts.length >= 3) {
            const attachmentId = parts[1];
            const filename = parts.slice(2).join(':');
            coverImage = `https://notion.so/image/attachment%3A${encodeURIComponent(attachmentId)}%3A${encodeURIComponent(filename)}?id=${pageId}&table=block&width=2000&cache=v2`;
          }
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