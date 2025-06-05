'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ArrowLeft, Calendar, FileText, Image as ImageIcon, Info } from 'lucide-react';

interface DatabasePage {
  id: string;
  title: string;
  createdTime: number;
  publishedDate?: string;
  thumbnail?: string;
  coverImage?: string;
  icon?: string;
  debug?: {
    propertyData?: any;
    rawThumbnailValue?: any;
  };
}

interface DatabaseInfo {
  title: string;
  pages: DatabasePage[];
}

export default function NotionDatabasePage() {
  const params = useParams<{ databaseId: string }>();
  const [database, setDatabase] = useState<DatabaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  const [recordMap, setRecordMap] = useState<any>(null);

  useEffect(() => {
    const fetchDatabase = async () => {
      try {
        setLoading(true);
        const response = await fetch('/blogtestfinal/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ databaseId: params.databaseId }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch Notion database');
        }
        
        const data = await response.json();
        console.log('Database response:', data); // Debug log
        setDatabase(data.database);
        setRecordMap(data.recordMap);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching Notion database:', err);
        setError(err.message || 'An error occurred while fetching the database');
        setLoading(false);
      }
    };

    if (params.databaseId) {
      fetchDatabase();
    }
  }, [params.databaseId]);

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

  // Get the best image to use as thumbnail
  const getPageThumbnail = (page: DatabasePage) => {
    return page.thumbnail;
  };

  // Check if an image URL is valid
  const isValidImageUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    
    // Check if it's an attachment format that wasn't properly converted
    if (url.startsWith('attachment:')) return false;
    
    // Check if it's a notion.so image URL or a standard image URL
    return url.startsWith('https://notion.so/image/') || 
           url.startsWith('https://www.notion.so/') ||
           (url.startsWith('http') && 
            (url.includes('.png') || url.includes('.jpg') || 
             url.includes('.jpeg') || url.includes('.gif')));
  };

  // Create a direct Notion link for debugging
  const getNotionPageUrl = (pageId: string) => {
    return `https://notion.so/${pageId.replace(/-/g, '')}`;
  };

  // Format a date string (YYYY-MM-DD) to a more readable format
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Link href="/blogtest" className="inline-flex items-center text-green-800 hover:text-green-700 font-medium">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Blog
            </Link>
            <button 
              onClick={() => setShowDebug(!showDebug)} 
              className="inline-flex items-center text-gray-500 hover:text-gray-700"
            >
              <Info className="h-4 w-4 mr-1" />
              {showDebug ? 'Hide Debug' : 'Show Debug'}
            </button>
          </div>

          <div className="max-w-4xl mx-auto">
            {!loading && !error && database && (
              <>
                <h1 className="text-4xl font-bold mb-8">{database.title}</h1>
                
                {showDebug && (
                  <div className="bg-gray-50 p-4 mb-8 rounded-lg border border-gray-200 overflow-auto max-h-96">
                    <h3 className="font-semibold mb-2">Database Information:</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium">Database ID:</span>
                        <code className="ml-2 text-xs bg-gray-100 p-1 rounded">{params.databaseId}</code>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Page Count:</span>
                        <span className="ml-2 text-sm">{database.pages.length}</span>
                      </div>
                    </div>
                    <details>
                      <summary className="cursor-pointer text-sm font-medium mb-2">Raw Page Data</summary>
                      <pre className="text-xs mt-2">
                        {JSON.stringify(database.pages, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
                
                {database.pages.length > 0 ? (
                  <div className="space-y-6">
                    {database.pages.map((page) => {
                      const thumbnail = getPageThumbnail(page);
                      
                      return (
                        <div key={page.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            {thumbnail ? (
                              <div className="w-full md:w-1/3 relative">
                                <img 
                                  src={thumbnail} 
                                  alt={page.title}
                                  className="w-full h-48 md:h-full object-cover"
                                  onError={(e) => {
                                    // Hide the image if it fails to load
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    console.error(`Failed to load image: ${thumbnail}`);
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-full md:w-1/3 bg-gray-100 flex items-center justify-center">
                                <ImageIcon className="h-16 w-16 text-gray-300" />
                              </div>
                            )}
                            
                            <div className="p-6 flex-1">
                              <div className="flex justify-between">
                                <h3 className="text-xl font-medium text-gray-900">{page.title}</h3>
                                {showDebug && (
                                  <a 
                                    href={getNotionPageUrl(page.id)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-500 hover:underline"
                                  >
                                    View in Notion
                                  </a>
                                )}
                              </div>
                              
                              <div className="flex items-center text-gray-500 mt-2">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>
                                  {page.publishedDate 
                                    ? formatDate(page.publishedDate)
                                    : new Date(page.createdTime).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <div className="mt-4 space-y-2">
                                <Link 
                                  href={`/blogtest/${page.id}`}
                                  className="inline-block px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition-colors"
                                >
                                  View Blog Post
                                </Link>
                              </div>
                              
                              {showDebug && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                  <h4 className="text-sm font-medium text-gray-700 mb-2">Debug Information</h4>
                                  
                                  <div className="space-y-2 text-xs text-gray-500">
                                    <div>
                                      <span className="font-medium">Page ID:</span>
                                      <code className="ml-2 bg-gray-100 p-1 rounded">{page.id}</code>
                                    </div>
                                    
                                    {page.publishedDate && (
                                      <div>
                                        <span className="font-medium">Published Date:</span>
                                        <code className="ml-2 bg-gray-100 p-1 rounded">{page.publishedDate}</code>
                                      </div>
                                    )}
                                    
                                    {thumbnail && (
                                      <div>
                                        <span className="font-medium">Thumbnail URL:</span>
                                        <div className="mt-1 break-all bg-gray-100 p-1 rounded">
                                          {thumbnail}
                                        </div>
                                        <div className="mt-1">
                                          <span className="font-medium">Valid URL Format:</span> 
                                          <span className={isValidImageUrl(thumbnail) ? "text-green-500" : "text-red-500"}>
                                            {isValidImageUrl(thumbnail) ? "Yes" : "No"}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {page.debug?.rawThumbnailValue && page.debug.rawThumbnailValue !== thumbnail && (
                                      <div>
                                        <span className="font-medium">Original Value:</span>
                                        <div className="mt-1 break-all bg-gray-100 p-1 rounded">
                                          {page.debug.rawThumbnailValue}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {page.debug?.propertyData?.allProperties && (
                                      <details>
                                        <summary className="cursor-pointer font-medium">All Properties</summary>
                                        <div className="mt-2">
                                          <h5 className="font-medium text-xs mb-1">Date Properties:</h5>
                                          {Object.entries(page.debug.propertyData.allProperties).map(([key, value]) => {
                                            // Try to identify date properties
                                            const isDateLike = 
                                              key === 'I_fZ' || 
                                              key === 'x_Vq' || 
                                              String(value).includes('start_date') ||
                                              String(value).includes('-') && String(value).match(/\d{4}-\d{2}-\d{2}/);
                                            
                                            if (isDateLike) {
                                              return (
                                                <div key={key} className="mb-2 p-2 bg-yellow-50 rounded">
                                                  <div className="font-medium">{key}:</div>
                                                  <pre className="mt-1 text-xs overflow-auto">
                                                    {JSON.stringify(value, null, 2)}
                                                  </pre>
                                                </div>
                                              );
                                            }
                                            return null;
                                          })}
                                          
                                          <h5 className="font-medium text-xs mb-1 mt-3">All Properties:</h5>
                                          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-48 text-xs">
                                            {JSON.stringify(page.debug.propertyData.allProperties, null, 2)}
                                          </pre>
                                        </div>
                                      </details>
                                    )}
                                    
                                    {page.debug?.propertyData && !page.debug.propertyData.allProperties && (
                                      <details>
                                        <summary className="cursor-pointer font-medium">Property Data</summary>
                                        <pre className="mt-2 bg-gray-100 p-2 rounded overflow-auto max-h-48">
                                          {JSON.stringify(page.debug.propertyData, null, 2)}
                                        </pre>
                                      </details>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-700">No pages found in this database.</p>
                  </div>
                )}
              </>
            )}
            
            {loading && (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                <p className="ml-4 text-gray-700">Loading database content...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 mb-8">
                <h3 className="text-lg font-semibold mb-2">Error loading Notion database</h3>
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 