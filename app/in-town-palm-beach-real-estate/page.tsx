"use client";

import { Instrument_Serif } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { Logo } from "../components/Logo"
import Link from "next/link"
import Image from "next/image"
import { IdxShowcaseTwo } from "@/components/IdxShowcaseTwo"
import { ContactCard } from "@/app/components/ContactCard"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function InTownPage() {
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
        grid-template-columns: 1fr 1fr !important;
        gap: 1rem !important;
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
      }

      /* Content spacing */
      [id^="IDX-showcaseGallery"] .IDX-showcaseContent {
        padding: 0 !important;
        margin: 0 !important;
        height: auto !important;
        min-height: 0 !important;
      }

      [id^="IDX-showcaseGallery"] .IDX-showcaseAddress {
        margin: 0 !important;
        padding-top: 0.75rem !important;
        line-height: 1 !important;
        height: auto !important;
        min-height: 0 !important;
      }

      [id^="IDX-showcaseGallery"] .IDX-showcasePrice,
      [id^="IDX-showcaseGallery"] .IDX-showcaseCityStateZip {
        margin: 0 !important;
        padding: 0 !important;
        line-height: 1 !important;
        height: auto !important;
        min-height: 0 !important;
      }

      /* Remove any extra spacing */
      [id^="IDX-showcaseGallery"] * {
        margin: 0 !important;
        min-height: 0 !important;
        height: auto !important;
      }

      /* Force image size and aspect ratio */
      [id^="IDX-showcaseGallery"] .IDX-showcasePhoto {
        width: 442px !important;
        height: 295px !important;
        object-fit: cover !important;
        display: block !important;
      }

      /* Make container match image size */
      [id^="IDX-showcaseGallery"] .IDX-showcaseLink {
        width: 442px !important;
        height: 295px !important;
        display: block !important;
      }

      /* Ensure images maintain aspect ratio on smaller screens */
      @media (max-width: 1024px) {
        [id^="IDX-showcaseGallery"] .IDX-showcasePhoto,
        [id^="IDX-showcaseGallery"] .IDX-showcaseLink {
          width: 100% !important;
          height: auto !important;
          aspect-ratio: 442/295 !important;
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
      
      <main className="relative min-h-screen w-full overflow-x-hidden pt-[120px]">
        {/* Main Section */}
        <section className="pt-32 bg-white relative" style={{ zIndex: 30 }}>
          <div className="container mx-auto px-4">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
              In Town Homes
            </h1>

            <div className="max-w-4xl mx-auto mb-16">
              {/* Hero Image */}
              <div className="relative w-full aspect-[16/9] mb-12">
                <Image
                  src="/intown.jpg"
                  alt="In Town Palm Beach"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  priority
                />
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold text-[#1b4e1f] mb-4">
                  In Town Palm Beach Real Estate: Wells Road South to Worth Avenue
                </h2>
                <p className="text-gray-800 mb-6">
                  Palm Beach condos and Single Family Homes, Waterfront: Ocean and Intracoastal.
                </p>
                
                <div className="text-gray-800 space-y-6">
                  <p>
                    In-Town, Mid-Town, or between the bridges, is more of a "Hamptons" type of lifestyle near "Main Street", where there is a mix of historic and new homes, along with apartments and condominiums. The center of this resort town features historic homes largely built in the 20's built by Palm Beach master architects such as Addison Mizner, Maurice Fatio, John Volk, and Marion Sims Wyeth among others. The community takes great pride in it's history and the preservation of its important Palm Beach properties.
                  </p>
                  <p>
                    The most desired Palm Beach condominiums and co-ops are along South Ocean Boulevard from Royal Poinciana Way South to Worth Avenue, and along Lake Trail. These exclusive apartments provide fabulous views of the ocean and/or the Intracoastal waterway and yacht basin. The residences in this area boast a sense of neighborhood and convenience blending into the commercial district of Worth Avenue for world-renown shopping and dining in a host of outstanding restaurants; all within walking distance.
                  </p>
                </div>
              </div>

              {/* Property Listings Section - Separate from prose */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-[#1b4e1f] mb-8">
                  Palm Beach Homes available for Purchase:
                </h3>
                
                <div className="relative" style={{ zIndex: 40 }}>
                  <div className="not-prose">
                    <IdxShowcaseTwo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Card Section */}
        <ContactCard className="relative" style={{ zIndex: 30 }} />

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}