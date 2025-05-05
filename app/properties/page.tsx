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
      
      <main className="relative min-h-screen w-full overflow-x-hidden pt-[20px]">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
          <Image
            src="/northend.jpg"
            alt="Palm Beach Luxury Properties"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-center ${instrumentSerif.className}`}>
              Luxury Properties
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-2xl mx-auto px-4">
              Discover exceptional homes in Palm Beach's most prestigious locations
            </p>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#1b4e1f]">150+</p>
                <p className="text-gray-600">Active Listings</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#1b4e1f]">$2.5M+</p>
                <p className="text-gray-600">Average Price</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#1b4e1f]">25+</p>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#1b4e1f]">98%</p>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Property Types Statement Section - Replacing the filters */}
        <section className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className={`text-2xl md:text-3xl font-light mb-8 ${instrumentSerif.className}`}>
                Discover Our Distinguished Portfolio
              </h2>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#1b4e1f] rounded-full mr-3"></div>
                  <span className="text-gray-700">Luxury Estates</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#1b4e1f] rounded-full mr-3"></div>
                  <span className="text-gray-700">Waterfront Properties</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#1b4e1f] rounded-full mr-3"></div>
                  <span className="text-gray-700">Condominiums</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#1b4e1f] rounded-full mr-3"></div>
                  <span className="text-gray-700">Historic Mansions</span>
                </div>
              </div>
              <p className="text-gray-600 mt-8 max-w-2xl mx-auto">
                From oceanfront estates to luxury condominiums, our portfolio showcases the finest properties Palm Beach has to offer.
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
                  Featured Listings
                </h2>
                <p className="text-gray-600">
                  Explore our curated selection of Palm Beach's finest properties
                </p>
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