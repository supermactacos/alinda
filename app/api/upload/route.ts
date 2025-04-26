import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No image file uploaded' },
        { status: 400 }
      );
    }

    // Make sure it's an image file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Read the file as array buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const uniqueId = uuidv4();
    const filename = `${uniqueId}-${file.name.replace(/\s/g, '_')}`;
    
    // Define the upload directory - use public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, filename);

    // Write the file
    await writeFile(filepath, buffer);

    // Return the URL path to access the file
    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      data: {
        url: imageUrl,
        filename
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 