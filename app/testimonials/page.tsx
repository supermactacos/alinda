"use client";

import { Instrument_Serif } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { testimonials } from "../data/testimonials"
import Image from "next/image"
import Link from "next/link"
import { Logo } from "../components/Logo"
import { ContactCard } from "@/app/components/ContactCard"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function TestimonialsPage() {
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
          {/* Hero Section */}
          <section className="pt-32 bg-white">
            <div className="container mx-auto px-4">
              <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
                Testimonials
              </h1>

              <div className="max-w-5xl mx-auto">
                {/* Hero Image */}
              

                {/* Description */}
                <div className="text-center mb-16">
                  <h2 className={`text-3xl font-semibold mb-4 text-[#1b4e1f]`}>
                    Thinking of Buying, Selling, or Leasing in Palm Beach?
                  </h2>
                  <h3 className={`text-2xl mb-6 text-[#1b4e1f]`}>
                    Contact us for Experience you can Trust!
                  </h3>
                  
                  <p className="text-gray-800 text-xl leading-relaxed">
                    With a strong commitment to our loyal customers, Linda Olsson built her iconic real estate firm "one satisfied customer at a time" and the firm's clients don't hesitate to recommend Linda and her firm to their friends, family, and associates...
                  </p>
                </div>

                {/* Testimonials Grid */}
                <div className="columns-1 md:columns-2 gap-8 [column-fill:_balance] mb-8">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow break-inside-avoid mb-8"
                    >
                      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#1b4e1f] font-semibold">{testimonial.author}</p>
                          {testimonial.type && (
                            <p className="text-gray-600 text-sm">{testimonial.type}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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
    </>
  )
} 