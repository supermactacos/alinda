"use client";

import { Instrument_Serif } from "next/font/google"
import { Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Footer } from "@/app/components/Footer"
import Image from "next/image"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function JohnDotterrerPage() {
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
        {/* Bio Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Link href="/about-us/our-team" className="inline-flex items-center text-[#1b4e1f] hover:text-[#143917] mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Image Column */}
              <div className="md:col-span-1">
                <div className="relative aspect-[3/4] w-full">
                  <Image 
                    src="/team4.jpg" 
                    alt="John C. Dotterrer" 
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-[#1b4e1f]" />
                    <a href="mailto:john@lindaolsson.com" className="text-[#1b4e1f] hover:underline">
                      john@lindaolsson.com
                    </a>
                  </div>
                  
                  <Button asChild className="w-full bg-[#1b4e1f] hover:bg-[#143917]">
                    <a href="mailto:john@lindaolsson.com">Contact John</a>
                  </Button>
                </div>
              </div>
              
              {/* Content Column */}
              <div className="md:col-span-2">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light mb-6 ${instrumentSerif.className}`}>
                  John C. Dotterrer
                </h1>
                
                <div className="prose prose-lg max-w-none">
                  <p>
                    For 40 years, John has been a resident of the North End of Palm Beach and practiced law on the island, including with prestigious law firms. With that length and depth of experience, he has extensive working knowledge of Island real estate, residents, contracts, sale and acquisition procedures, town regulations and boards, their members, staff, surveyors, title agencies and closings.
                  </p>
                  
                  <p>
                    He is a graduate of the College of Engineering, University of Michigan, and Tulane Law School. John actively engages in a wide variety of Island activities and sports. He is proud to serve as an Associate of the long-standing, well respected Palm Beach real estate firm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
} 