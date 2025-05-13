"use client";

import { Navbar } from "@/components/Navbar"
import { Footer } from "@/app/components/Footer"
import Script from 'next/script'
import { useEffect, useState } from "react"

export default function MLSSearchPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    // Set loaded state
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
            className="idx-content-container max-w-[1200px] mx-auto px-4"
            style={{
              minHeight: "800px", 
              width: "100%", 
              margin: "0 auto",
              position: "relative"
            }}
          >
            {/* Loading state */}
            {!isLoaded && (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-lg text-gray-600">Loading MLS Search...</div>
              </div>
            )}
            
            {/* IDX content will be injected here */}
            <div id="idx-results-wrapper"></div>
          </div>
          <div id="idxStop"></div>
        </section>

        {/* Load IDX script properly using Next.js Script component */}
        <Script
          id="idxScript"
          src="//mlspalmbeach.lindaolsson.com/idx/customjs.php"
          strategy="afterInteractive"
          onLoad={() => setIsLoaded(true)}
        />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
} 