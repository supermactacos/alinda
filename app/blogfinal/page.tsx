'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { Calendar, FileText } from 'lucide-react';

// Your Notion Database ID
const NOTION_DATABASE_ID = "20939be3d9a98062ad78db86f9156030";

interface DatabasePage {
  id: string;
  title: string;
  createdTime: number;
  publishedDate?: string;
  thumbnail?: string;
  coverImage?: string;
  icon?: string;
}

interface DatabaseInfo {
  title: string;
  pages: DatabasePage[];
}

export default function BlogPage() {
  const [database, setDatabase] = useState<DatabaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const fetchDatabase = async () => {
      try {
        setLoading(true);
        const response = await fetch('/blogfinal/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ databaseId: NOTION_DATABASE_ID }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch blog posts');
        }
        
        const data = await response.json();
        setDatabase(data.database);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching blog:', err);
        setError(err.message || 'An error occurred while fetching blog posts');
        setLoading(false);
      }
    };

    fetchDatabase();
  }, []);

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

  // Format date nicely
  const formatDate = (dateString: string | undefined, fallbackTimestamp: number) => {
    if (dateString) {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      } catch (error) {
        console.error('Error formatting date:', error);
      }
    }
    
    // Fallback to created time
    return new Date(fallbackTimestamp).toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                <p className="ml-4 text-lg text-gray-600">Loading blog posts...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-700 mb-8 max-w-3xl mx-auto">
                <h3 className="text-lg font-semibold mb-2">Unable to load blog posts</h3>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && database && (
              <>
                <h1 className="text-4xl font-bold mb-8">Blog</h1>
                
                {database.pages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {database.pages.map((post) => (
                      <div key={post.id} className="flex flex-col rounded-lg shadow-md overflow-hidden h-full border border-gray-100 transition-transform hover:translate-y-[-5px]">
                        <div className="h-48 bg-gray-100 relative">
                          {post.thumbnail ? (
                            <img 
                              src={post.thumbnail} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Replace with FileText icon if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.classList.add('flex', 'justify-center', 'items-center');
                                  const icon = document.createElement('div');
                                  icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>';
                                  parent.appendChild(icon);
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex justify-center items-center">
                              <FileText className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <div className="flex items-center text-gray-500 mt-1 mb-4">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {formatDate(post.publishedDate, post.createdTime)}
                            </span>
                          </div>
                          
                          <div className="mt-auto pt-4">
                            <Link 
                              href={`/blogfinal/${post.id}`}
                              className="inline-block px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition-colors"
                            >
                              Read Article
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No blog posts available</h3>
                    <p className="text-gray-500">Check back soon for new content!</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 