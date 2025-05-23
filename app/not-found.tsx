'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/app/components/Footer';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(true);
  
  useEffect(() => {
    // Redirect to home page after a short delay
    const timer = setTimeout(() => {
      router.replace('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
        <Navbar isScrolled={isScrolled} />
      </div>
      
      <div className="pt-36 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-green-800 mb-6">Page Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">We couldn't find the page you were looking for.</p>
            <p className="text-lg text-gray-500 mb-10">You will be redirected to the home page in a few seconds.</p>
            
            <div className="mb-8 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800 mx-auto"></div>
            
            <Link href="/" className="inline-block px-6 py-3 bg-green-800 text-white rounded-md font-medium hover:bg-green-700 transition-colors">
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 