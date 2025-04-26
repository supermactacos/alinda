import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
}

interface BlogData {
  posts: BlogPost[];
}

export async function GET() {
  try {
    // Path to the blog data file
    const dataFilePath = path.join(process.cwd(), 'data', 'blogs.json');
    
    // Check if the file exists
    if (!fs.existsSync(dataFilePath)) {
      // If file doesn't exist, return empty array
      return NextResponse.json({ posts: [] });
    }
    
    // Read and parse the file
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents) as BlogData;
    
    // Sort posts by date (newest first)
    const sortedPosts = data.posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return NextResponse.json({ posts: sortedPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
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
    
    // For thumbnails only: if no image is provided, extract the first image from content
    const thumbnailImage = image || extractFirstImageUrl(content) || null;
    
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