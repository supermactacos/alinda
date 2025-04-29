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

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1b4e1f] shadow-lg">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>
      
      <main className="relative min-h-screen w-full overflow-x-hidden pt-[120px]">
        {/* IDX Widget Container */}
        <section className="pt-32 pb-24 bg-white">
          <div id="idxStart" className="idx-content-container" style={{minHeight: "500px", width: "100%"}}>
            {/* IDX content will be injected here */}
          </div>
          <div id="idxStop"></div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
} 