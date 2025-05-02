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

export default function DaleCoudertPage() {
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
                    src="/team3.jpg" 
                    alt="Dale Coudert" 
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-[#1b4e1f]" />
                    <a href="mailto:dalecoudert@me.com" className="text-[#1b4e1f] hover:underline">
                      dalecoudert@me.com
                    </a>
                  </div>
                  
                  <Button asChild className="w-full bg-[#1b4e1f] hover:bg-[#143917]">
                    <a href="mailto:dalecoudert@me.com">Contact Dale</a>
                  </Button>
                </div>
              </div>
              
              {/* Content Column */}
              <div className="md:col-span-2">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light mb-6 ${instrumentSerif.className}`}>
                  Dale Coudert
                </h1>
                
                <div className="prose prose-lg max-w-none">
                  <p>
                    An alumnus of Northwestern University, Ms. Coudert's professional journey has been rich with noteworthy roles including: serving as a Real Estate Broker with Cross and Brown Company in New York, specializing in Commercial and Investment Real Estate, and her groundbreaking work in the 1970s, as part of the team which established the First Women's Bank in New York. Dale Coudert not only raised the possibility of financial institutions extending credit (independently) to women, but also helped steer that prospect to fruition resulting in the newly formed bank's extension of credit lending to accommodate women of all backgrounds.
                  </p>
                  
                  <p>
                    A Chicago native, and longtime resident of Palm Beach, Dale knows everyone from Palm Beach to Aspen to New York, and around the Globe. She has long been lauded for her outstanding community leadership in Palm Beach, Aspen, and Manhattan. She is currently a member of the Palm Beach Sailfish Club, the International Women's Forum, and she is proud to serve as a Director at the Palm Beach Zoo and Conservation Society. A lifetime member of the Aspen Institute, Ms. Coudert has also been aligned with several other civic organizations. She has been active on the Board(s) of Directors of the New York Drama League, the Metropolitan Opera Club, and the Kennedy Center.
                  </p>
                  
                  <p>
                    For over five decades, Dale Coudert, a Palm Beach mainstay and Founding Director of the Coudert Institute, a Palm Beach-based non-profit, has been bringing people together to facilitate dialogue on subjects that matter. Dale is a legend of a lady, who is in love with Palm Beach, and her connections run deep.
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