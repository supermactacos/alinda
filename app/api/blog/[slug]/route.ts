import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { NotionAPI } from 'notion-client';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  html?: string;
  plainText?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  image?: string;
  featuredImage?: string;
  createdTime?: string;
  date?: string;
  author: string;
  isDeleted?: boolean;
  source?: string;
}

interface BlogData {
  posts: BlogPost[];
}

// Initialize NotionAPI for fetching page content
const notionApi = new NotionAPI();

// Helper function to get plain text from HTML
function getPlainTextFromHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

// Helper function to create a clean excerpt
const createCleanExcerpt = (content: string, maxLength: number = 150): string => {
  // Get plain text first
  const plainText = getPlainTextFromHtml(content);
  
  // Trim and limit length
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Find a good breaking point
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
};

// Helper function to extract the first image URL from HTML content
const extractFirstImageUrl = (html: string): string | null => {
  // Use regex to find the first img tag and extract its src
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);
  
  if (match && match[1]) {
    return match[1];
  }
  
  return null;
};

// Get a specific blog post by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Path to the blog data file
    const dataFilePath = path.join(process.cwd(), 'data', 'blogs.json');
    
    // Check if the file exists
    if (!fs.existsSync(dataFilePath)) {
      // If no local file, try Notion
      return await getNotionPost(slug);
    }
    
    // Read and parse the file
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents) as BlogData;
    
    // Find the post with the matching slug
    const post = data.posts.find(
      (post) => post.slug === slug && !post.isDeleted
    );
    
    if (!post) {
      // If not found in local data, try Notion
      return await getNotionPost(slug);
    }
    
    return NextResponse.json({ post, source: 'local' });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// Helper function to get post from Notion
async function getNotionPost(pageId: string) {
  try {
    // Log the pageId for debugging
    console.log("Attempting to fetch Notion post with ID:", pageId);
    
    // Use the existing endpoint that was working before
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://lindaolsson.com' : 'http://localhost:3000');
    const url = `${baseUrl}/api/blogs?pageId=${pageId}`;
    console.log("Fetching from URL:", url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.log("Notion post fetch failed with status:", response.status);
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    const data = await response.json();
    console.log("Notion post data received:", Object.keys(data));
    
    // Return the Notion data directly
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching Notion post:', error);
    // If the error is related to the page not being found, return 404
    if (error.message && error.message.includes('Not Found')) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// Helper function to extract cover image from Notion recordMap
function extractCoverImage(recordMap: any, pageId: string): string | null {
  const block = recordMap.block[pageId]?.value;
  if (block?.format?.page_cover) {
    // Check if it's an external URL
    if (block.format.page_cover.startsWith('http')) {
      return block.format.page_cover;
    }
    // Otherwise it's an internal Notion image
    return `https://www.notion.so/image/${encodeURIComponent(block.format.page_cover)}?table=block&id=${pageId}`;
  }
  return null;
}

// Delete a blog post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Path to the blog data file
    const dataFilePath = path.join(process.cwd(), 'data', 'blogs.json');
    
    // Check if the file exists
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Read and parse the file
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents) as BlogData;
    
    // Find the post with the matching slug
    const postIndex = data.posts.findIndex(post => post.slug === slug);
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Instead of actually removing the post, mark it as deleted
    data.posts[postIndex].isDeleted = true;
    
    // Write the updated data back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
} 