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
import { ContactCard } from "@/app/components/ContactCard"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function HireProfessionalPage() {
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
              Buying or Selling? Hire a Professional!
            </h1>

            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <img
                  src="/lindafar.jpg"
                  alt="Linda R. Olsson at Hampton Court Palace"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>

              <h2 className={`text-2xl font-semibold mb-6 text-[#1b4e1f]`}>
                Let us provide you with a property market analysis...
              </h2>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                The single most important factor for a timely real estate sale is pricing. Our agents are seasoned professionals, who are pleased to prepare the property analysis to establish an accurate property evaluation and recommended listing price. The suggested price will be supported by a comprehensive data base of properties and statistics coupled with our knowledge of current trends. We are delighted to offer this complimentary professional service with no obligation. Call us today (561) 820-9195 to set up your confidential market analysis of your home today!
              </p>

              <h2 className={`text-2xl font-semibold mb-6 text-[#1b4e1f]`}>
                Let us put our expertise to work for you...We get Results!
              </h2>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                Upon listing your property, we visit with you, building or house managers, to obtain the pertinent information on the property as it relates to condition, improvements made, floor plans, survey, elevation certificates and any documentation to help us sell the property, including professional photographs, and video tours. We aim to showcase the property on line, which we immediately upload this to the Palm Beach and the Regional Multiple Listing Service, Realtor.com, Zillow.com, and many other internet web sites making it accessible to over 90,000 real estate agents in South Florida and the worldwide web. One of the keys to our success is having the professional tools to do the job and to know and to understand the buying habits of their potential buyers. We achieve this through the two Multiple Listing services placing your property in front of agents who live and breathe finding your next dream home and their buyers!
              </p>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                Linda R. Olsson, Inc., Realtor welcomes the opportunity to list/market, and sell your property. We maintain a balance of old fashioned, time tested marketing principles and state of the art technology for current business practices. We produce quality advertising for display in the Palm Beach Daily News, the Palm Beach Post, Lifestyles, and other regional, national and international publications while at the same time maintaining a strong presence on the internet. The scope of Linda R. Olsson, Inc.'s reach extends worldwide... with a strong nationwide concentration in high tax states such as California, New York, Connecticut, New Jersey, and along the entire East Coast including Massachusetts and Washington D.C. We have a customized, high profile marketing and networking campaign including social media outlets. The property will immediately be placed on our unrivaled web site, along with many other sites, providing immediate exposure to the world wide web. According to the National Association of Realtors in 2016, over (44) percent of buyers looked for properties online first. The world we live in today is digital one and searching for a home is no different.
              </p>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                At the owner's discretion, we utilize our company sign and hold public open houses. We are in constant communication with buyers and sellers, available 7 days a week, providing the utmost customer service to our loyal customers. Whether you are buying or selling... Call us today! The Experience you can Trust... Specializing in Palm Beach Luxury Properties for Over 28 Years let our Professionalism, Expert Negotiation Skills, Superior Customer Service and Years of Experience in Palm Beach Listing, and Marketing Palm Beach Luxury Homes, Condominiums, and Land, assist you through the process... We are here to help you through the process... Let us help you find your slice of Paradise in Palm Beach!
              </p>
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