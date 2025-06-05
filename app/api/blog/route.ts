import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { NotionAPI } from 'notion-client';

// Initialize the Notion API client
const notionApi = new NotionAPI();

// Your Notion Database ID
const NOTION_DATABASE_ID = "20939be3d9a98062ad78db86f9156030";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  content: string;
  excerpt: string;
  image?: string;
  featuredImage?: string;
  isDeleted?: boolean;
  source?: string; // 'local' or 'notion'
}

interface NotionBlogPost {
  id: string;
  title: string;
  createdTime: number;
  publishedDate?: string;
  thumbnail?: string;
  coverImage?: string;
}

interface BlogData {
  posts: BlogPost[];
}

// Get all blog posts
export async function GET() {
  try {
    // Step 1: Get local blog posts
    const dataFilePath = path.join(process.cwd(), 'data', 'blogs.json');
    
    let localPosts: BlogPost[] = [];
    // Check if the file exists
    if (fs.existsSync(dataFilePath)) {
    // Read and parse the file
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents) as BlogData;
    
      // Filter out deleted posts
      localPosts = data.posts.filter(post => !post.isDeleted);
      // Mark as local source
      localPosts.forEach(post => {
        post.source = 'local';
      });
    }
    
    // Step 2: Get Notion blog posts
    let notionPosts: BlogPost[] = [];
    try {
      // Use the existing endpoint that was working before
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://lindaolsson.com' : 'http://localhost:3000');
      const response = await fetch(`${baseUrl}/blogs/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ databaseId: NOTION_DATABASE_ID }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Notion API response:", data);
        
        // Convert Notion posts to our BlogPost format
        if (data.database && Array.isArray(data.database.pages)) {
          // Process pages one by one to get excerpts
          notionPosts = await Promise.all(data.database.pages.map(async (post: NotionBlogPost) => {
            // Create a date string, preferring publishedDate if available
            const postDate = post.publishedDate 
              ? new Date(post.publishedDate).toISOString() 
              : new Date(post.createdTime).toISOString();
            
            // Create a slug for Notion posts - use blogfinal path which is working
            const slug = `blogs/${post.id}`;
            
            // Try to get a proper excerpt by fetching the page content
            let excerpt = await getNotionExcerpt(post.id);
            
            // Fallback if no excerpt could be generated
            if (!excerpt) {
              if (post.title) {
                excerpt = `Learn more about "${post.title}" in this article from Linda Olsson, Inc.`;
              } else {
                excerpt = 'Read this blog post from Linda Olsson, Inc.';
              }
            }
            
            return {
              id: post.id,
              title: post.title,
              slug: slug,
              date: postDate,
              author: 'Linda Olsson', // Default author
              content: '', // Content is loaded on the post page
              excerpt: excerpt,
              image: post.thumbnail || post.coverImage || '/default.jpeg',
              source: 'notion'
            } as BlogPost;
          }));
        } else {
          console.error('Invalid data structure from Notion API:', data);
        }
      } else {
        console.error('Failed to fetch from Notion API:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching Notion blog posts:', error);
      // Continue with just the local posts if Notion fetch fails
    }
    
    // Step 3: Merge and sort posts
    const allPosts = [...localPosts, ...notionPosts].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    
    return NextResponse.json({ posts: allPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// Helper function to get Notion pages
async function getNotionPages() {
  try {
    // Get the database content
    const recordMap = await notionApi.getPage(NOTION_DATABASE_ID);
    
    if (!recordMap) {
      console.error('No record map returned from Notion API');
      return [];
    }
    
    // Find collection (database) in the recordMap
    const collections = recordMap.collection || {};
    const collectionIds = Object.keys(collections);
    
    if (!collectionIds.length) {
      console.error('No collections found in recordMap');
      return [];
    }
    
    // Extract pages from the collection
    const blocks = recordMap.block || {};
    const pages: NotionBlogPost[] = [];
    
    // Process each block
    for (const [id, block] of Object.entries(blocks)) {
      // Skip the database block itself
      if (id === NOTION_DATABASE_ID) continue;
      
      const value = block.value;
      
      // Only process page blocks that are children of our database
      if (value && value.type === 'page' && value.parent_id === NOTION_DATABASE_ID) {
        // Extract title
        const title = value.properties?.title?.[0]?.[0] || 'Untitled';
        
        // Extract creation time
        const createdTime = value.created_time || Date.now();
        
        // Extract published date if available
        let publishedDate;
        if (value.properties) {
          // Look for a date property - simplified approach
          for (const [propName, propValue] of Object.entries(value.properties)) {
            if (Array.isArray(propValue) && propValue[0] && 
                typeof propValue[0][0] === 'string' && 
                propValue[0][0].match(/^\d{4}-\d{2}-\d{2}$/)) {
              publishedDate = propValue[0][0];
              break;
            }
          }
        }
        
        // Extract thumbnail (cover image)
        let thumbnail;
        if (value.format?.page_cover) {
          // Handle Notion's internal images
          if (value.format.page_cover.startsWith('/')) {
            thumbnail = `https://www.notion.so${value.format.page_cover}`;
          } else {
            thumbnail = value.format.page_cover;
          }
        }
        
        // Create page object
        pages.push({
          id,
          title,
          createdTime,
          publishedDate,
          thumbnail
        });
      }
    }
    
    return pages;
  } catch (error) {
    console.error('Error fetching Notion pages:', error);
    return [];
  }
}

// Helper function to get plain text from HTML
const getPlainTextFromHtml = (html: string): string => {
  // Server-side environment doesn't have DOM, use regex approach
  const strippedHtml = html.replace(/<[^>]*>/g, '');
  return strippedHtml.trim();
};

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

// Create a new blog post
export async function POST(request: Request) {
  try {
    const { title, author, content, excerpt, image, date } = await request.json();
    
    // Validate required fields
    if (!title || !author || !content) {
      return NextResponse.json(
        { error: 'Title, author, and content are required' },
        { status: 400 }
      );
    }
    
    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    // Path to the blog data file
    const dataFilePath = path.join(process.cwd(), 'data', 'blogs.json');
    
    // Create directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Initialize data structure if file doesn't exist
    let data: BlogData = { posts: [] };
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      data = JSON.parse(fileContents) as BlogData;
    }
    
    // Create clean excerpt with proper handling of HTML
    const cleanExcerpt = excerpt 
      ? createCleanExcerpt(excerpt) 
      : createCleanExcerpt(content);
    
    // For thumbnails: try image prop first, then first image in content, then default
    const thumbnailImage = image || extractFirstImageUrl(content) || '/default.jpeg';
    
    // The actual featured image to display at the top of the post should only be set if manually provided
    const featuredImage = image || null;
    
    // Create new post
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      slug,
      date: date || new Date().toISOString(),
      author,
      content,
      excerpt: cleanExcerpt,
      image: thumbnailImage,         // Used for thumbnails in blog listing
      featuredImage: featuredImage,  // Only show at top of post if manually set
      isDeleted: false,              // Explicitly mark as not deleted
      source: 'local'
    };
    
    // Add new post to the data
    data.posts.push(newPost);
    
    // Write the updated data back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ post: newPost });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

// Helper function to extract an excerpt from a Notion page
async function getNotionExcerpt(pageId: string): Promise<string | null> {
  try {
    // Try to fetch the page content
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://lindaolsson.com' : 'http://localhost:3000');
    const response = await fetch(`${baseUrl}/api/blogs?pageId=${pageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    // Check if we have record map data
    if (!data.recordMap || !data.recordMap.block) {
      return null;
    }
    
    const blocks = data.recordMap.block;
    let textContent = '';
    
    // Go through blocks to find text content
    for (const [id, block] of Object.entries(blocks)) {
      // Skip the page block itself
      if (id === pageId) continue;
      
      const value = (block as any).value;
      
      // Only process blocks that are children of our page
      if (value && value.parent_id === pageId) {
        // Extract text from text blocks
        if (value.type === 'text' && value.properties && value.properties.title) {
          const text = value.properties.title.map((textChunk: any[]) => textChunk[0]).join('');
          if (text) {
            textContent += text + ' ';
            // If we have enough text, stop
            if (textContent.length > 200) break;
          }
        }
        
        // Also try paragraph blocks
        if (value.type === 'paragraph' && value.properties && value.properties.title) {
          const text = value.properties.title.map((textChunk: any[]) => textChunk[0]).join('');
          if (text) {
            textContent += text + ' ';
            // If we have enough text, stop
            if (textContent.length > 200) break;
          }
        }
      }
    }
    
    // If we found some text, format it as an excerpt
    if (textContent) {
      // Trim to reasonable length and add ellipsis
      if (textContent.length > 200) {
        const lastSpace = textContent.substring(0, 200).lastIndexOf(' ');
        if (lastSpace > 0) {
          textContent = textContent.substring(0, lastSpace) + '...';
        } else {
          textContent = textContent.substring(0, 200) + '...';
        }
      }
      return textContent;
    }
    
    return null;
  } catch (error) {
    console.error('Error generating excerpt:', error);
    return null;
  }
} 