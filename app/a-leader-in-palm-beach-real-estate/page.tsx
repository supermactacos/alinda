"use client";

import { Instrument_Serif } from "next/font/google"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import Link from "next/link"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { Logo } from "@/app/components/Logo"
const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function LeaderPage() {
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
      <div className="fixed top-0 left-0 right-0 z-[40] bg-[#1b4e1f] shadow-lg">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>
      
      <main className="relative min-h-screen w-full overflow-x-hidden pt-[120px]">
        {/* Leader Section */}
        <section className="pt-32 bg-white">
          <div className="container mx-auto px-4">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
              A Leader in Palm Beach Real Estate
            </h1>
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-2xl font-semibold mb-6 text-[#1b4e1f]`}>
                It's your Real Estate Experience – make it a good one!
              </h2>
              <p className="text-gray-800 text-xl leading-relaxed mb-6">
                Linda R. Olsson, Inc., Realtor is celebrating its 30th year as a leader among Luxury Palm Beach Real Estate firms. Linda Olsson, broker owner, takes great pride in the continued success of her name-sake firm. A Palm Beach resident for over twenty years, Linda is an active community member; she lives, plays, and works in town. She lives and breaths Palm Beach real estate... she and her staff are available 24/7 which equates to unparalleled customer service.
              </p>
              <p className="text-gray-800 text-xl leading-relaxed mb-6">
                Her personal knowledge of the community cannot be replicated by national firms. Realizing there was a demand for personalized, professional real estate service, in 1989 Linda opened the firm specializing in Palm Beach Luxury Properties. Our successful track record is a testament to our commitment to buyers and sellers. Our customers do not hesitate to recommend us, please take a moment of your time to read our wonderful testimonials from our loyal clients.
              </p>
              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                We are committed to our customers... We guide buyers and sellers through the sale or selection of their home, condominium, or land with professionalism! Whether you are buying or selling let us put our expertise to work for you! A Lifelong Commitment, <Link href="#" className="text-[#1b4e1f] font-semibold hover:underline">Click here to read the full article</Link>.
              </p>
              <Link href="#" className="text-[#1b4e1f] font-semibold hover:underline block mb-6">
                Click here to view our testimonials from satisfied customers.
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg italic">Thinking about buying or selling in Palm Beach? Specializing in Palm Beach Luxury Properties for over 30 years, Contact Us for Experience You Can TRUST!</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-lg">
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>In-depth knowledge of the market</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>Expert negotiation skills and superior service</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>Unrivaled website: <Link href="http://www.LindaOlsson.com" className="text-[#8B0000] hover:underline">www.LindaOlsson.com</Link> providing global internet exposure on the most highly visible web sites</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>First class advertising; professional photography and outstanding videos</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>Incomparable targeted marketing; direct mail, e-mail blasts</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>We Are Social: Follow us on Instagram, Facebook, Twitter, YouTube</p>
              </div>
            </div>
          </div>
        </section>

      {/* Contact Card Section */}
      <section className="pt-4 pb-24 bg-white">
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
                      <p><Link href="#" className="text-green-900  hover:underline">View Active Listings →</Link></p>
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