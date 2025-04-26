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

export default function InTownTownhomesPage() {
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
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1b4e1f] shadow-lg">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>
      
      <main className="relative min-h-screen w-full overflow-x-hidden pt-[120px]">
        {/* Main Section */}
        <section className="pt-32 bg-white relative" style={{ zIndex: 30 }}>
          <div className="container mx-auto px-4">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
              In-Town Townhomes
            </h1>

            <div className="max-w-4xl mx-auto mb-16">
              {/* Hero Image */}
              <div className="relative w-full aspect-[16/9] mb-12">
                <Image
                  src="/intowntownhomes.jpg"
                  alt="In-Town Townhomes Palm Beach"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  priority
                />
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold text-[#1b4e1f] mb-4">
                  In-Town: Wells Road South to Worth Avenue
                </h2>
                
                <div className="text-gray-800 space-y-6">
                  <p>
                    In-Town, Mid-Town, or between the bridges, is more of a "Hamptons" type of lifestyle near "Main Street", where there is a mix of historic and new homes, along with apartments and condominiums. The center of this resort town features historic homes largely built in the 20's built by Palm Beach master architects such as Addison Mizner, Maurice Fatio, John Volk, and Marion Sims Wyeth among others. The community takes great pride in it's history and the preservation of its important Palm Beach properties.
                  </p>
                </div>
              </div>

              {/* Property Listings Section - Separate from prose */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-[#1b4e1f] mb-8">
                  Townhomes available in this area:
                </h3>
                
                <div className="relative" style={{ zIndex: 40 }}>
                  <div className="not-prose">
                    <IdxShowcaseThree widgetId="57659" />
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
    </>
  )
} 