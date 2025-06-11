"use client";

import { Instrument_Serif } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { Logo } from "../components/Logo"
import Link from "next/link"
import Image from "next/image"
import { ContactCard } from "@/app/components/ContactCard"
import { IdxListingsWidget } from "@/components/IdxListingsWidget"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

// Add a variable for our system font
const systemFont = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function NorthEndPage() {
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
        {/* Main Section */}
        <section className="pt-32 bg-white relative" style={{ zIndex: 30 }}>
          <div className="container mx-auto px-4">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
              North End Homes
            </h1>

            <div className="max-w-5xl mx-auto mb-16">
              {/* Hero Image */}
              <div className="relative w-full aspect-[16/9] mb-12">
                <Image
                  src="/northend.jpg"
                  alt="North End Palm Beach Waterfront"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  priority
                />
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold text-[#1b4e1f] mb-4">
                  North End Palm Beach Real Estate: East Inlet Drive South to Wells Road
                </h2>
                <p className="text-gray-800 mb-6">
                  Palm Beach homes, Single Family, Waterfront: Ocean and Intracoastal.
                </p>
                
                <div className="text-gray-800 space-y-6">
                  <p>
                    The North End offers a variety of one and two story single family homes from the classic Bermuda to British West Indies ranging in size from 2,000 to 20,000 square feet with quiet streets and the best beaches in town.
                  </p>
                  <p>
                    Known for its laid back lifestyle, Palm Beachers enjoy getting together at the neighborhood beach cabanas for barbecues and beach parties. The bike trail, which meanders for approximately 7 miles adjacent to the homes along the Intracoastal waterway provides a safe place to walk, ride bikes, and just enjoy the scenery.
                  </p>
                  <p>
                    North End homes on the Intracoastal are perfect for boating enthusiasts requiring deep water dockage.
                  </p>
                </div>
              </div>

              {/* Property Listings Section - Separate from prose */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-[#1b4e1f] mb-8">
                  Homes available for Purchase:
                </h3>
                
                <div className="w-full mb-8">
                  {/* Use the reusable component instead */}
                  <IdxListingsWidget widgetId="103608" columns={3} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Card Section */}
        <ContactCard />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
} 