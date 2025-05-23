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

// Get a single blog post by slug
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
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Read and parse the file
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents) as BlogData;
    
    // Find the post with the matching slug
    const post = data.posts.find(post => post.slug === slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// Update a blog post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { title, author, content, excerpt, image, date } = await request.json();
    
    // Validate required fields
    if (!title || !author || !content) {
      return NextResponse.json(
        { error: 'Title, author, and content are required' },
        { status: 400 }
      );
    }
    
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
    
    // Create new slug if title has changed
    const newSlug = title === data.posts[postIndex].title 
      ? slug 
      : title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
    
    // Create clean excerpt with proper handling of HTML
    const cleanExcerpt = excerpt 
      ? createCleanExcerpt(excerpt) 
      : createCleanExcerpt(content);
    
    // For thumbnails: use provided image, or extract first image from content, or keep existing
    const thumbnailImage = image === "" ? null : 
      (image || extractFirstImageUrl(content) || data.posts[postIndex].image || null);
    
    // Featured image only set if manually provided
    const featuredImage = image === "" ? null : (image || null);
    
    // Update the post
    const updatedPost: BlogPost = {
      ...data.posts[postIndex],
      title,
      slug: newSlug,
      author,
      content,
      excerpt: cleanExcerpt,
      image: thumbnailImage,
      featuredImage: featuredImage,
      date: date || data.posts[postIndex].date,
    };
    
    // Replace the old post with the updated one
    data.posts[postIndex] = updatedPost;
    
    // Write the updated data back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
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
    
    // Remove the post
    data.posts.splice(postIndex, 1);
    
    // Write the updated data back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
} 