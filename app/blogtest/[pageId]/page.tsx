'use client';

import React, { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap, Block } from 'notion-types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Import required CSS for react-notion-x
import 'react-notion-x/src/styles.css';
// Import additional styles for code highlighting, equation support, etc.
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

interface BlockWithValue {
  value: Block
}

export default function DynamicNotionPage() {
  const params = useParams<{ pageId: string }>();
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(true);
  const [pageTitle, setPageTitle] = useState('Notion Page');

  useEffect(() => {
    const fetchNotionPage = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/blogtest/api?pageId=${params.pageId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch Notion page');
        }
        
        const data = await response.json();
        setRecordMap(data.recordMap);
        
        // Extract title from the record map if available
        if (data.recordMap?.block) {
          const blocks = Object.values(data.recordMap.block) as BlockWithValue[];
          const rootBlock = blocks.find((block) => block.value.type === 'page');
          if (rootBlock && rootBlock.value.properties?.title) {
            setPageTitle(rootBlock.value.properties.title[0][0] || 'Notion Page');
          }
        }
        
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching Notion page:', err);
        setError(err.message || 'An error occurred while fetching the Notion page');
        setLoading(false);
      }
    };

    if (params.pageId) {
      fetchNotionPage();
    }
  }, [params.pageId]);

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

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link href="/blogtest" className="inline-flex items-center text-green-800 hover:text-green-700 font-medium mb-8">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="max-w-4xl mx-auto">
            {!loading && !error && (
              <h1 className="text-4xl font-bold mb-8">{pageTitle}</h1>
            )}
            
            {loading && (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                <p className="ml-4 text-gray-700">Loading Notion content...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 mb-8">
                <h3 className="text-lg font-semibold mb-2">Error loading Notion content</h3>
                <p>{error}</p>
                <p className="mt-2 text-sm">
                  Make sure you have provided a valid Notion page ID and that the page is publicly accessible.
                </p>
              </div>
            )}

            {recordMap && !loading && !error && (
              <div className="notion-container">
                <NotionRenderer 
                  recordMap={recordMap}
                  fullPage={false}
                  darkMode={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 