'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SlugNotFound() {
  const router = useRouter();
  
  useEffect(() => {
    // Immediately redirect to home page
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-gray-600">Redirecting to home page...</h2>
        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-800 mx-auto"></div>
      </div>
    </div>
  );
} 