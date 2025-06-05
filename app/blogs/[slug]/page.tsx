'use client';

import React, { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap, Block } from 'notion-types';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Import required CSS for react-notion-x
import 'react-notion-x/src/styles.css';
// Import additional styles for code highlighting, equation support, etc.
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

interface BlockWithValue {
  value: Block
}

export default function BlogPostPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState('Blog Post');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [createdTime, setCreatedTime] = useState<number | null>(null);
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.slug) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/blogs?pageId=${params.slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }

        const data = await response.json();
        setRecordMap(data.recordMap);
        
        // Extract page metadata
        if (data.page) {
          setPageTitle(data.page.title || 'Blog Post');
          setCoverImage(data.page.coverImage || null);
          setCreatedTime(data.page.createdTime || null);
        } else if (data.recordMap?.block) {
          // Extract title from the record map if page data is not available
          const blocks = Object.values(data.recordMap.block) as BlockWithValue[];
          const rootBlock = blocks.find((block) => block.value.id === params.slug);
          
          if (rootBlock) {
            // Extract title
            if (rootBlock.value.properties?.title) {
              setPageTitle(rootBlock.value.properties.title[0][0] || 'Blog Post');
            }
            
            // Extract cover image
            if (rootBlock.value.format?.page_cover) {
              let coverUrl = rootBlock.value.format.page_cover;
              if (coverUrl.startsWith('/')) {
                coverUrl = `https://www.notion.so${coverUrl}`;
              }
              setCoverImage(coverUrl);
            }
            
            // Extract created time
            if (rootBlock.value.created_time) {
              setCreatedTime(rootBlock.value.created_time);
            }
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load the blog post. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return '';
    
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-green-800 hover:text-green-700 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                <p className="ml-4 text-lg text-gray-600">Loading post...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-700 mb-8">
                <h3 className="text-lg font-semibold mb-2">Error</h3>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && recordMap && (
              <>
                {coverImage && (
                  <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
                    <img
                      src={coverImage}
                      alt={pageTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold mb-4">{pageTitle}</h1>

                <div className="flex items-center text-gray-500 mb-8">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(createdTime)}</span>
                </div>

                <div className="notion-container">
                  <NotionRenderer 
                    recordMap={recordMap}
                    fullPage={false}
                    darkMode={false}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 