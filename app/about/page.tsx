"use client";

import { Instrument_Serif } from "next/font/google"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import Link from "next/link"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"
import { Logo } from "@/app/components/Logo"
import { Footer } from "../components/Footer"
import { ContactCard } from "@/app/components/ContactCard"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Add scroll event listener
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
        {/* About Section */}
        <section className="pt-32 bg-white">
          <div className="container mx-auto px-4">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
              About Linda
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="relative flex md:justify-end justify-center">
                <img
                  src="/linda.png"
                  alt="Linda R. Olsson"
                  className="w-[75%] md:pr-20 pr-0 rounded-lg"
                />
              </div>
              <div>
                <h2 className={`text-2xl font-semibold mb-6 text-[#1b4e1f]`}>
                  Linda R. Olsson, Owner/Broker-Founder
                </h2>
                <p className="text-gray-800 text-xl leading-relaxed mb-6">
                  Linda is the broker/owner of Linda R. Olsson, Inc., Realtor, Specializing in Palm Beach Luxury Properties with our Global Reach, Local Expertise, and an Unrivaled Web Site. Recognized by the Wall Street Journal as one of "America's Best Real Estate Agents", known for our professionalism, superior customer service and in-depth knowledge of the market. Representing buyers and sellers of Palm Beach's finest residences... You can profit from our knowledge, expertise, and global presence. We don't just talk about excellence... We Get Results!
                </p>
                <p className="text-gray-800 text-xl leading-relaxed mb-8">
                  With over 30 years of experience selling <Link href="#" className="text-[#1b4e1f] font-semibold hover:underline">Luxury Homes in Palm Beach</Link>, Linda and her associates have gained a vast knowledge of Palm Beach, its people, and its history--knowledge we put to daily use to help our clients. The firm's reputation and success are built upon experience, expertise, and excellent service. Choosing a firm with the commitment, confidentiality, and dedication to represent your best interests makes all the difference. Your privacy is important to us. We take great pride in utilizing our experience, resources, and global connections to unite extraordinary people with extraordinary properties. A Lifelong Commitment.
                </p>
                <Link href="#" className="text-[#1b4e1f] font-semibold hover:underline">
                  Click here to read the full article.
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Thinking About Buying or Selling Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">Linda Olsson Inc., Realtor</p>
            </div>
            <h2 className={`text-5xl md:text-6xl text-center font-light mb-6 ${instrumentSerif.className}`}>
              Thinking About Buying or Selling in Palm Beach?
            </h2>
            <p className="text-center text-xl mb-8">
              Linda Olsson has been specializing in Palm Beach luxury properties for over 30 years. Contact us for experience you can TRUST!
            </p>
            <div className="flex justify-center mb-16">
              <Link href="https://mlspalmbeach.lindaolsson.com/idx/agent/15878726/linda-r-olsson">
                <Button className="bg-[#1b4e1f] text-white text-xl py-6 px-12 rounded-full hover:bg-[#1b4e1f]/90">
                  VIEW LISTINGS
                </Button>
              </Link>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-lg">
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>In-depth knowledge of the market;</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>Expert negotiation skills and superior service;</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>Unrivaled website: <Link href="http://www.LindaOlsson.com" className="text-[#8B0000] hover:underline">www.LindaOlsson.com</Link> providing global internet exposure on over 300 of the most highly visible web sites including Trulia, Zillow, Wall Street Journal.com, Realtor.com, and two MLS services;</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>First class advertising; prominent publications and professional photography;</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>Incomparable targeted marketing; direct mail, e-mail blasts, and social media;</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#8B0000]">•</span>
                <p>Over 30 Years of Experience...a Reputation you can Trust!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Card Section */}
        <ContactCard className="py-24 bg-[#fcfcfc]" />

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
} 