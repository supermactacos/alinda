"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "../components/Footer";
import { ArrowRight } from "lucide-react";
import { ContactCard } from "../components/ContactCard"
import Image from "next/image";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image?: string;
  slug: string;
  source?: string; // 'local' or 'notion'
}

// Helper function to strip HTML tags
const stripHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>/g, '');
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    // Fetch blog posts from our API
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log("Fetching blog posts...");
        
        const response = await fetch("/api/blog");
        const data = await response.json();
        
        console.log("API Response:", data);
        
        if (!data.posts || !Array.isArray(data.posts)) {
          console.error("Invalid response format - posts array missing");
          setLoading(false);
          return;
        }
        
        console.log(`Received ${data.posts.length} total posts`);
        console.log(`Notion posts: ${data.posts.filter((p: BlogPost) => p.source === 'notion').length}`);
        console.log(`Local posts: ${data.posts.filter((p: BlogPost) => p.source === 'local').length}`);
        
        // Filter local posts to only show those from 2023 onwards, but show all Notion posts
        const filteredPosts = data.posts.filter((post: BlogPost) => {
          if (post.source === 'notion') {
            return true; // Include all Notion posts
          }
          const postDate = new Date(post.date);
          return postDate.getFullYear() >= 2023; // Filter local posts by date
        });
        
        console.log("Filtered Posts:", filteredPosts);
        
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="pt-24 pb-16 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 pt-20">
          <h1 className={`text-5xl md:text-6xl text-center font-light mb-4 text-green-800 ${instrumentSerif.className}`}>
            Palm Beach Real Estate Blog
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Stay Informed About Palm Beach Luxury Real Estate Trends, Market Updates, and Insights from Linda R. Olsson and Her Team.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium text-gray-600">No blog posts found</h2>
              <p className="mt-2 text-gray-500">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  {post.image && (
                    <div className="relative h-60 w-full">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          // Hide the image if it fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                    </div>
                    <h2 className={`text-2xl font-medium mb-3 text-green-800 ${instrumentSerif.className}`}>
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{stripHtmlTags(post.excerpt)}</p>
                    <Link 
                      href={post.source === 'notion' ? `/${post.slug}` : `/blog/${post.slug}`}
                      className="inline-flex items-center text-green-800 hover:text-green-700 font-medium"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Card Section */}
      <ContactCard />

      <Footer />
    </div>
  );
} 