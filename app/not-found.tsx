import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/app/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
        <Navbar isScrolled={true} />
      </div>
      
      <div className="pt-36 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-green-800 mb-6">Page Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">We couldn't find the page you were looking for.</p>
            <p className="text-lg text-gray-500 mb-10">Please use the menu above or the button below to navigate to a working page.</p>
            
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