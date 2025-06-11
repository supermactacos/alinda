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

export default function SloansCurveToManalapanPage() {
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
    <>
      {/* Main Content */}
      <div>
        <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1b4e1f] shadow-lg">
          <Navbar isScrolled={isScrolled} alwaysSolid />
        </div>
        
        <main className="relative min-h-screen w-full overflow-x-hidden pt-[120px]">
          {/* Main Section */}
          <section className="pt-32 bg-white relative" style={{ zIndex: 30 }}>
            <div className="container mx-auto px-4">
              <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
                Sloans Curve to Manalapan Condominiums
              </h1>

              <div className="max-w-5xl mx-auto mb-16">
                {/* Hero Image */}
                <div className="relative w-full aspect-[16/9] mb-12">
                  <Image
                    src="/sloan.jpg"
                    alt="Sloans Curve to Manalapan Condominiums"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    priority
                  />
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-semibold text-[#1b4e1f] mb-4">
                    Palm Beach condos and Intracoastal Condominiums
                  </h2>
                  
                  <div className="text-gray-800 space-y-6">
                    <p>
                      Just South of the Estate Section along South Ocean Boulevard is the exclusive Sloan's Curve condominium complex. The approximate three mile strip of land continues with condominiums lining the Atlantic and the Intracoastal waterway. This distinctive community conforms to a convenient, beach front, casual lifestyle with most of the apartments affording fabulous views of the ocean or the Intracoastal waterway. The Four Season's Resort and the Ritz Carlton make their home here along with the Town's oceanfront Par 3 golf course, Phipp's Ocean Park, which is a lovely area for a picnic with grills, pavilions, six tennis courts and a playground.
                    </p>
                    <p>
                      The miles of sandy beaches are wonderful for walking, swimming and enjoying the ocean breezes. Combined with the many area restaurants, The Florida Stage theatre, and various shops; this is a lovely area to live and play.
                    </p>
                  </div>
                </div>

                {/* Property Listings Section - Separate from prose */}
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold text-[#1b4e1f] mb-8">
                    Condominiums available for Purchase:
                  </h3>
                  
                  <div className="w-full mb-8">
                    {/* Use the reusable component instead */}
                    <IdxListingsWidget widgetId="99412" columns={3} />
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
      </div>
    </>
  )
} 