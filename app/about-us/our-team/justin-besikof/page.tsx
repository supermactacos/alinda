"use client";

import { Instrument_Serif } from "next/font/google"
import { Mail, ArrowLeft, Phone } from "lucide-react"
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

export default function JustinBesikofPage() {
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
                    src="/team2.jpeg" 
                    alt="Justin Besikof" 
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-[#1b4e1f]" />
                    <a href="mailto:jbesikof@gmail.com" className="text-[#1b4e1f] hover:underline">
                      jbesikof@gmail.com
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-[#1b4e1f]" />
                    <a href="tel:6123827352" className="text-[#1b4e1f] hover:underline">
                      (612) 382-7352
                    </a>
                  </div>
                  
                  <Button asChild className="w-full bg-[#1b4e1f] hover:bg-[#143917]">
                    <a href="mailto:jbesikof@gmail.com">Contact Justin</a>
                  </Button>
                </div>
              </div>
              
              {/* Content Column */}
              <div className="md:col-span-2">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light mb-6 ${instrumentSerif.className}`}>
                  Justin Besikof
                </h1>
                <h2 className="text-2xl text-[#1b4e1f] mb-4">Realtor</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p>
                    Justin is an accomplished and seasoned professional with 30 years of experience in real estate, mergers and acquisitions, corporate finance and private equity.
                  </p>
                  
                  <p>
                    In Palm Beach, Justin has closed record setting sales of condominiums, land and single family homes. In addition to advising buyers and sellers, Justin is an active investor in Palm Beach real estate. He has in depth knowledge and extensive experience with the Town of Palm Beach's intricate zoning and architectural requirements for new construction, major alterations and historic renovations. With a team of architects, engineers, designers, lawyers and contractors at the ready, he will make your Palm Beach dream home a reality!
                  </p>
                  
                  <p>
                    Justin is an avid runner and exercise enthusiast and leverages this passion with daily run/walks to explore and evaluate every street on Palm Beach island. With this intimate knowledge of the island, Justin provides his clients with invaluable insight and counsel when making the decision to buy or sell in Palm Beach.
                  </p>
                  
                  <p>
                    In addition to his Palm Beach real estate activity, Justin is the founder and president of a boutique investment banking firm, headquartered in Wayzata, Minnesota. Justin has negotiated and closed hundreds of complex merger and acquisition transactions across a variety of industries with the most sophisticated buyers in the world, including multi-billion dollar private equity funds and leading public and private companies.
                  </p>
                  
                  <p>
                    Justin is a graduate of the University of Wisconsin-Madison, where he earned his Bachelor of Business Administration in Accounting, Master of Science in Finance, and Master of Accountancy in Taxation. He is also a CPA (inactive).
                  </p>
                  
                  <p>
                    Please call, text or email Justin at 612-382-7352 or jbesikof@gmail.com anytime to discuss his passion for Palm Beach real estate, favorite local restaurants or the most scenic walking/running routes on the island!
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