"use client";

import { Instrument_Serif } from "next/font/google"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import Link from "next/link"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { ContactCard } from "@/app/components/ContactCard"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function EssentialThingsPage() {
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
        {/* Main Section */}
        <section className="pt-32 bg-white">
          <div className="container mx-auto px-4">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
              4 Essential Things to Consider When Buying a Condo
            </h1>

            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <img
                  src="/essential4.jpg"
                  alt="Luxury Palm Beach Condominium with Pool"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>

              <p className="text-gray-800 text-xl leading-relaxed mb-12">
                Condominiums remain popular housing choices, especially among those seeking a low-maintenance lifestyle, with the benefit of ownership. However, before making an offer on a condo there are a few things to keep in mind.
              </p>

              <div className="space-y-12">
                <div>
                  <h2 className={`text-2xl font-semibold mb-4 text-[#1b4e1f]`}>
                    Fees & Service Charges:
                  </h2>
                  <p className="text-gray-800 text-xl leading-relaxed">
                    Condo associations typically charge a variety of fees to cover everything from modest maintenance charges to extravagant luxury amenities. Understand what is included, anticipated large expenditures, and out of the ordinary expenses likely to be incurred. Pay attention to deferred maintenance, planned upgrades, or other potential costs so you are not taken by surprise.
                  </p>
                </div>

                <div>
                  <h2 className={`text-2xl font-semibold mb-4 text-[#1b4e1f]`}>
                    Management and Operational Efficiency:
                  </h2>
                  <p className="text-gray-800 text-xl leading-relaxed">
                    Spend time speaking with current residents, review community literature, and take a careful look around the area to get a general "feel" for how things are maintained.
                  </p>
                </div>

                <div>
                  <h2 className={`text-2xl font-semibold mb-4 text-[#1b4e1f]`}>
                    Finances and Reserve Funds:
                  </h2>
                  <p className="text-gray-800 text-xl leading-relaxed">
                    Perform due diligence on the finances and reserve funds of the condo association to make sure their problem doesn't become your own. Pay special attention to large numbers of foreclosures or vacant units that could eventually result in higher per owner premiums to compensate for loss of revenue.
                  </p>
                </div>

                <div>
                  <h2 className={`text-2xl font-semibold mb-4 text-[#1b4e1f]`}>
                    Lifestyle and Values:
                  </h2>
                  <p className="text-gray-800 text-xl leading-relaxed">
                    When you buy a condo you buy a lifestyle – for better or worse. Be sure the condo and community share the same values and interests you find important. Remember, since condo associations are typically governed in a democratic fashion, a change of heart by the majority could lead to long-term frustration.
                  </p>
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
    </>
  )
} 