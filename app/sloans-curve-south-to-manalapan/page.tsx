"use client";

import { Instrument_Serif } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { Logo } from "../components/Logo"
import Link from "next/link"
import Image from "next/image"
import { IdxShowcaseThree } from "@/components/IdxShowcaseThree"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function SloansCurveToManalapanPage() {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1500);
    
    const contentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 2000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(contentTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Loading overlay with slide-up transition */}
      <div 
        className={`fixed inset-0 bg-green-800 z-[200] flex items-center justify-center transition-all duration-500 ease-in-out ${
          loadingVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-white text-center p-12">
          <div className={`text-7xl md:text-8xl lg:text-9xl font-light mb-3 mt-3 text-white ${instrumentSerif.className}`}>
            <TextAnimate 
              animation="slideUp" 
              by="word"
              className={`${instrumentSerif.className} block`}
              duration={0.5}
              delay={0}
              once
              startOnView={false}
            >
              Linda R. Olsson
            </TextAnimate>
          </div>
          <p className={`text-xl text-pink-200 ${instrumentSerif.className}`}>Loading...</p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
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

              <div className="max-w-4xl mx-auto mb-16">
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
                  
                  <div className="relative" style={{ zIndex: 40 }}>
                    <div className="not-prose">
                      <IdxShowcaseThree widgetId="43962" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Card Section */}
          <section className="pt-16 pb-24 bg-white relative" style={{ zIndex: 30 }}>
            <div className="container mx-auto px-4">
              <h2 className={`text-5xl md:text-6xl text-center font-light mb-6 ${instrumentSerif.className}`}>
                Contact Us Today
              </h2>
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                <div className="flex justify-between items-start gap-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Linda R. Olsson, Inc., Realtor</h2>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <p>Office: <a href="tel:5618209195" className="text-green-900 hover:underline">(561) 820-9195</a></p>
                        <p>Cell: <a href="tel:5613294044" className="text-green-900 hover:underline">(561) 329-4044</a></p>
                        <p>Email: <a href="mailto:linda@lindaolsson.com" className="text-green-900 hover:underline">linda@lindaolsson.com</a></p>
                      </div>
                      <div className="space-y-1 pt-2">
                        <p><Link href="#" className="text-green-900 hover:underline">View Active Listings →</Link></p>
                        <p><Link href="#" className="text-green-900 hover:underline">View Sold Listings →</Link></p>
                      </div>
                      <div className="pt-2">
                        <p>101 Bradley Place</p>
                        <p>Palm Beach, FL 33480</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-4">
                    <div className="w-54 pr-4">
                      <Logo />
                    </div>
                    <img
                      src="/linda.png"
                      alt="Linda R. Olsson"
                      className="w-52 h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  )
} 