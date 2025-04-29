import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  content: string;
  excerpt?: string;
  image?: string;
  featuredImage?: string;
}

interface BlogData {
  posts: BlogPost[];
}

export async function GET(
  request: NextRequest,
  context: { params: { slug: string[] } }
) {
  try {
    // Get the full slug from the URL segments
    const slugParams = context.params;
    const fullSlug = Array.isArray(slugParams.slug) ? slugParams.slug.join('/') : slugParams.slug;
    
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
    
    // Find the post with matching slug
    const post = data.posts.find(post => post.slug === fullSlug);
    
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

// Update a blog post
export async function PUT(
  request: NextRequest,
  context: { params: { slug: string[] } }
) {
  try {
    const slugParams = context.params;
    const fullSlug = Array.isArray(slugParams.slug) ? slugParams.slug.join('/') : slugParams.slug;
    const { title, author, content, excerpt, image, date } = await request.json();
    
    // Path to the blog data file
    const dataFilePath = path.join(process.cwd(), 'data', 'blogs.json');
    
    // Read existing data
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents) as BlogData;
    
    // Find the post index
    const postIndex = data.posts.findIndex(post => post.slug === fullSlug);
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // For thumbnails: try new image prop first, then first image in new content, then default
    const thumbnailImage = image || 
      (content ? extractFirstImageUrl(content) : null) || 
      '/default.jpeg';
    
    // Update the post
    const updatedPost = {
      ...data.posts[postIndex],
      title: title || data.posts[postIndex].title,
      author: author || data.posts[postIndex].author,
      content: content || data.posts[postIndex].content,
      excerpt: excerpt || data.posts[postIndex].excerpt,
      image: thumbnailImage,
      featuredImage: image || data.posts[postIndex].featuredImage,
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
  request: NextRequest,
  context: { params: { slug: string[] } }
) {
  try {
    const slugParams = context.params;
    const fullSlug = Array.isArray(slugParams.slug) ? slugParams.slug.join('/') : slugParams.slug;
    
    // Path to the blog data file
    const dataFilePath = path.join(process.cwd(), 'data', 'blogs.json');
    
    // Read existing data
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents) as BlogData;
    
    // Filter out the post to delete
    const updatedPosts = data.posts.filter(post => post.slug !== fullSlug);
    
    if (updatedPosts.length === data.posts.length) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Write the updated data back to the file
    data.posts = updatedPosts;
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