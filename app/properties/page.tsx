"use client";

import { Instrument_Serif } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { Logo } from "../components/Logo"
import Link from "next/link"
import Image from "next/image"
import { IdxShowcase } from "@/components/IdxFour"
import { ContactCard } from "@/app/components/ContactCard"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function PropertiesPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    // Add IDX styles
    const style = document.createElement('style');
    style.textContent = `
      /* Target the showcase gallery */
      [id^="IDX-showcaseGallery"] {
        table-layout: fixed !important;
        border-spacing: 0 !important;
        font-size: 14px !important;
      }

      /* Container modifications */
      [id^="IDX-showcaseGallery"] .IDX-showcaseContainer {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        margin: 0 !important;
        height: auto !important;
        min-height: 0 !important;
      }

      /* Row and cell modifications */
      [id^="IDX-showcaseGallery"] .IDX-showcaseRow {
        display: grid !important;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
        gap: 2rem !important;
        margin: 0 !important;
        padding: 0 !important;
        height: auto !important;
        min-height: 0 !important;
      }

      [id^="IDX-showcaseGallery"] .IDX-showcaseCell {
        padding: 0 !important;
        margin: 0 !important;
        height: auto !important;
        min-height: 0 !important;
        vertical-align: top !important;
        transition: transform 0.2s ease-in-out !important;
      }

      [id^="IDX-showcaseGallery"] .IDX-showcaseCell:hover {
        transform: translateY(-5px) !important;
      }

      /* Content spacing */
      [id^="IDX-showcaseGallery"] .IDX-showcaseContent {
        padding: 1rem !important;
        margin: 0 !important;
        height: auto !important;
        min-height: 0 !important;
        background: white !important;
        border-radius: 0 0 8px 8px !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
      }

      [id^="IDX-showcaseGallery"] .IDX-showcaseAddress {
        margin: 0 !important;
        padding-top: 0.75rem !important;
        line-height: 1.2 !important;
        height: auto !important;
        min-height: 0 !important;
        font-size: 1.25rem !important;
        color: #1b4e1f !important;
        font-weight: 600 !important;
      }

      [id^="IDX-showcaseGallery"] .IDX-showcasePrice {
        margin: 0.5rem 0 !important;
        padding: 0 !important;
        line-height: 1.2 !important;
        height: auto !important;
        min-height: 0 !important;
        font-size: 1.5rem !important;
        font-weight: 700 !important;
        color: #333 !important;
      }

      [id^="IDX-showcaseGallery"] .IDX-showcaseCityStateZip {
        margin: 0 !important;
        padding: 0 !important;
        line-height: 1.2 !important;
        height: auto !important;
        min-height: 0 !important;
        color: #666 !important;
      }

      /* Force image size and aspect ratio */
      [id^="IDX-showcaseGallery"] .IDX-showcasePhoto {
        width: 100% !important;
        aspect-ratio: 4/3 !important;
        object-fit: cover !important;
        display: block !important;
        border-radius: 8px 8px 0 0 !important;
        transition: transform 0.3s ease !important;
      }

      /* Make container match image size */
      [id^="IDX-showcaseGallery"] .IDX-showcaseLink {
        width: 100% !important;
        display: block !important;
        overflow: hidden !important;
        border-radius: 8px 8px 0 0 !important;
      }

      [id^="IDX-showcaseGallery"] .IDX-showcaseLink:hover .IDX-showcasePhoto {
        transform: scale(1.05) !important;
      }

      @media (max-width: 1024px) {
        [id^="IDX-showcaseGallery"] .IDX-showcaseRow {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
          gap: 1.5rem !important;
        }
      }

      @media (max-width: 640px) {
        [id^="IDX-showcaseGallery"] .IDX-showcaseRow {
          grid-template-columns: 1fr !important;
          gap: 1rem !important;
        }
      }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (style.parentNode) {
        style.remove();
      }
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1b4e1f] shadow-lg">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>
      
      <main className="relative min-h-screen w-full overflow-x-hidden pt-32">
        {/* Hero Section */}
    
    
     
        {/* Property Types Statement Section - Replacing the filters */}
        <section className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-3 text-center ${instrumentSerif.className}`}>
              Palm Beach Homes
            </h1>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                
              </div>
              <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
                From Oceanfront Estates to Luxury Condominiums, Our Portfolio Showcases the Finest Properties Palm Beach has to Offer.
              </p>
            </div>
          </div>
        </section>

        {/* Main Properties Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className={`text-3xl md:text-4xl font-light mb-4 ${instrumentSerif.className}`}>
                  Linda's Top Picks
                </h2>
              
              </div>

              <div className="relative">
                <div className="not-prose">
                  <IdxShowcase />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className={`text-3xl md:text-4xl font-light mb-6 ${instrumentSerif.className}`}>
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-gray-600 mb-8">
                Let us help you discover the perfect property in Palm Beach. Our expert team is ready to assist you every step of the way.
              </p>
              <ContactCard className="relative" style={{ zIndex: 30 }} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}