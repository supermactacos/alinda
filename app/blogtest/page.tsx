'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ArrowRight, FileText, Database } from 'lucide-react';

// Example Notion pages (replace with your own)
const EXAMPLE_PAGES = [
  {
    id: 'your-notion-page-id-1',
    title: 'Getting Started with Notion',
    description: 'Learn how to use Notion effectively for your projects.'
  },
  {
    id: 'your-notion-page-id-2',
    title: 'Project Documentation',
    description: 'A template for documenting your projects in Notion.'
  },
  {
    id: 'your-notion-page-id-3',
    title: 'Blog Post Example',
    description: 'See how blog posts can be created and displayed from Notion.'
  }
];

// Example Notion databases (replace with your own)
const EXAMPLE_DATABASES = [
  {
    id: '20939be3d9a98062ad78db86f9156030',
    title: 'Blog Content Planning',
    description: 'A database of blog posts and content ideas.'
  }
];

export default function NotionBlogIndex() {
  const [isScrolled, setIsScrolled] = useState(true);
  const [customPageId, setCustomPageId] = useState('');
  const [customDatabaseId, setCustomDatabaseId] = useState('');
  const [activeTab, setActiveTab] = useState<'page' | 'database'>('page');

  // Handle form submission for custom page ID
  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPageId.trim()) {
      window.location.href = `/blogtest/${customPageId.trim()}`;
    }
  };

  // Handle form submission for custom database ID
  const handleDatabaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customDatabaseId.trim()) {
      window.location.href = `/blogtest/database/${customDatabaseId.trim()}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Notion Blog Example</h1>
            <p className="text-lg text-gray-700 mb-8">
              This is an example of using Notion as a CMS for your blog. You can view individual pages or entire databases from Notion.
            </p>

            <div className="mb-8">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('page')}
                  className={`py-3 px-6 font-medium ${
                    activeTab === 'page'
                      ? 'text-green-800 border-b-2 border-green-800'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Individual Pages
                </button>
                <button
                  onClick={() => setActiveTab('database')}
                  className={`py-3 px-6 font-medium ${
                    activeTab === 'database'
                      ? 'text-green-800 border-b-2 border-green-800'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Databases
                </button>
              </div>
            </div>

            {activeTab === 'page' && (
              <>
                <div className="bg-green-50 p-6 rounded-lg mb-8">
                  <h2 className="text-xl font-semibold mb-4">View a Notion page</h2>
                  <form onSubmit={handlePageSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      value={customPageId}
                      onChange={(e) => setCustomPageId(e.target.value)}
                      placeholder="Enter Notion page ID"
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      View Page
                    </button>
                  </form>
                  <p className="text-sm text-gray-600 mt-3">
                    Tip: The page ID is the string of characters at the end of your Notion page URL.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold mb-6">Example Pages</h2>
                
                <div className="space-y-4">
                  {EXAMPLE_PAGES.map((page) => (
                    <Link 
                      key={page.id}
                      href={`/blogtest/${page.id}`}
                      className="block p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <FileText className="h-6 w-6 mr-4 text-green-800 flex-shrink-0 mt-1" />
                        <div className="flex-grow">
                          <h3 className="text-xl font-medium text-gray-900">{page.title}</h3>
                          <p className="text-gray-600 mt-1">{page.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'database' && (
              <>
                <div className="bg-green-50 p-6 rounded-lg mb-8">
                  <h2 className="text-xl font-semibold mb-4">View a Notion database</h2>
                  <form onSubmit={handleDatabaseSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      value={customDatabaseId}
                      onChange={(e) => setCustomDatabaseId(e.target.value)}
                      placeholder="Enter Notion database ID"
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      View Database
                    </button>
                  </form>
                  <p className="text-sm text-gray-600 mt-3">
                    Tip: The database ID is the string of characters at the end of your Notion database URL.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold mb-6">Example Databases</h2>
                
                <div className="space-y-4">
                  {EXAMPLE_DATABASES.map((database) => (
                    <Link 
                      key={database.id}
                      href={`/blogtest/database/${database.id}`}
                      className="block p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <Database className="h-6 w-6 mr-4 text-green-800 flex-shrink-0 mt-1" />
                        <div className="flex-grow">
                          <h3 className="text-xl font-medium text-gray-900">{database.title}</h3>
                          <p className="text-gray-600 mt-1">{database.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
            
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">How to use this example</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Make your Notion page public or use a Notion integration token</li>
                <li>Copy the page ID from your Notion page URL</li>
                <li>Enter the ID in the form above or modify the example pages</li>
                <li>The page will be rendered using the react-notion-x library</li>
              </ol>
              <p className="mt-4 text-sm text-gray-600">
                For more advanced usage, check the <a href="https://github.com/NotionX/react-notion-x" className="text-green-800 underline" target="_blank" rel="noopener noreferrer">react-notion-x documentation</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 