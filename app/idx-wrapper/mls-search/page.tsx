"use client";

import { Navbar } from "@/components/Navbar"
import { Footer } from "@/app/components/Footer"
import { useEffect, useState } from "react"

export default function MLSSearchPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add IDX script when component mounts
  useEffect(() => {
    // Check if there's already an IDX script to avoid duplicates
    if (!document.getElementById('idxScript')) {
      const script = document.createElement('script');
      script.id = 'idxScript';
      script.src = 'https://yourIDXbroker.idxbroker.com/idx/customjs.php'; // Replace with your actual IDX script URL
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1b4e1f] shadow-lg">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>
      
      <main className="relative min-h-screen w-full overflow-x-hidden pt-[120px]">
        {/* IDX Widget Container */}
        <section className="pt-32 pb-24 bg-white">
          <div 
            id="idxStart" 
            className="idx-content-container max-w-[1200px] mx-auto"
            data-idx-widget-id="your-widget-id" // Replace with your actual widget ID if needed
            style={{
              minHeight: "800px", 
              width: "100%", 
              margin: "0 auto",
              position: "relative"
            }}
          >
            {/* IDX content will be injected here */}
            <div id="idx-results-wrapper"></div>
          </div>
          <div id="idxStop"></div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
} 