"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "../components/Footer";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { ContactCard } from "../components/ContactCard"

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  image?: string;
  featuredImage?: string;
  slug: string;
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string[] }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(true);
  const [processedContent, setProcessedContent] = useState<string>("");

  useEffect(() => {
    // Fetch blog post from our API
    const fetchPost = async () => {
      try {
        // Join the slug array back into a path
        const fullSlug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
        const response = await fetch(`/api/blog/${fullSlug}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data.post);
        setProcessedContent(data.post.content);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("The blog post you're looking for could not be found.");
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  // Apply correct fonts to headings after content is loaded
  useEffect(() => {
    if (post) {
      setTimeout(() => {
        const contentDiv = document.querySelector('.blog-content');
        if (contentDiv) {
          const headings = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
          headings.forEach(heading => {
            heading.classList.add(instrumentSerif.className);
          });
        }
      }, 100);
    }
  }, [post]);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-green-800 hover:text-green-700 font-medium mb-8">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Articles
          </Link>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium text-gray-600">Error</h2>
              <p className="mt-2 text-gray-500">{error}</p>
              <Link href="/blog" className="mt-4 inline-block text-green-800 hover:text-green-700">
                Return to Blog
              </Link>
            </div>
          ) : post ? (
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-4xl md:text-5xl font-light mb-6 text-green-800 ${instrumentSerif.className}`}>
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-gray-600 mb-8">
                <div className="flex items-center mr-6 mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center mb-2">
                  <User className="h-5 w-5 mr-2" />
                  <span>{post.author}</span>
                </div>
              </div>

              {/* Only show the featured image if it was manually set */}
              {post.featuredImage && (
                <div className="relative h-80 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div 
                className="prose prose-lg max-w-none mb-12 prose-headings:font-serif prose-headings:text-green-800 prose-img:rounded-lg prose-img:shadow-md prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-headings:font-light prose-headings:font-instrument-serif prose-img:mx-auto prose-img:block blog-content"
                dangerouslySetInnerHTML={{ __html: processedContent }} 
              />

              <div className="border-t border-gray-200 pt-8 mt-12">
                <Link href="/blog" className="inline-flex items-center text-green-800 hover:text-green-700 font-medium">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Articles
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Contact Card Section */}
      <ContactCard />

      <Footer />
    </div>
  );
} 