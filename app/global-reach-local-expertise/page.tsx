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

export default function GlobalReachPage() {
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
        <section className="pt-32 bg-white relative" style={{ zIndex: 30 }}>
          <div className="container mx-auto px-4">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
              Global Reach, Local Expertise
            </h1>

            {/* YouTube Video */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/I6hXfjiNNyk"
                  title="Palm Beach Real Estate"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <h2 className={`text-3xl font-semibold mb-6 text-[#1b4e1f]`}>
                For Over 30 Years...Specializing in Palm Beach Luxury Properties
              </h2>
              <h3 className="text-xl mb-8 text-gray-700">
                Representing Pieds-a'-Terre to Oceanfront Estates
              </h3>

              <div className="flex items-start gap-6 mb-6">
                <p className="text-gray-800 text-xl leading-relaxed flex-1">
                  Our global reach is extensive on the world wide web through our extended website {" "}
                  <Link href="http://www.LindaOlsson.com" className="text-[#1b4e1f] underline hover:no-underline">www.LindaOlsson.com</Link>, which is the best place to start your search for luxury {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach properties</Link> all luxury condominiums and co-op buildings, including Palm Beach, Manalapan, Jupiter Island, and the top golf course communities in Palm Beach County. Specializing in Palm Beach Luxury Properties for over 28 years... our site is considered to be the best web site in Palm Beach...it is user friendly, shows all Palm Beach properties for sale, and is continually informed by providing quarterly market reports, featured property videos, new listings, testimonials from satisfied customers, and outstanding blog + market data on over 4,000 properties and basic.
                </p>
                <img
                  src="/grlinda1.jpg"
                  alt="Linda R. Olsson Real Estate"
                  className="w-[180px] h-auto rounded-lg shadow-lg float-right"
                />
              </div>

              <div className="flex flex-col gap-8 mb-12">
                <p className="text-gray-800 text-xl leading-relaxed">
                  We are luxury brokers working with demanding clientele, and our goal is to continually satisfy their real estate needs. Our dedicated team is there for you 24/7. Our marketing services are comprehensive; as members of the Palm Beach and Regional multiple listing services, we provide access to every available listed property in Palm Beach and the surrounding area. We are social too... follow us on Instagram, Facebook, LinkedIn, and You Tube. Our web support includes the customized marketing of your property and outreach through extensive advertising, networking, and internet marketing. We regularly advertise in the exclusive "Mansion" section of the Friday edition of the Wall Street Journal, both print and online, the palm Avenue magazine of New York, and Palm Beach publications including The Shiny Sheet and the Palm Beach Guide.
                </p>
              </div>

              <div className="flex items-start gap-6 mb-6">
                <p className="text-gray-800 text-xl leading-relaxed flex-1">
                  Our unrivaled website ranks high on Google searches we continually update our web site with the most current information to keep our customers abreast of the market in Palm Beach and the surrounding area. Our web site is powered by the most current technology to advance our site in Google searches... their success in continuing to connect with qualified buyers and sellers worldwide is remarkable! We feature your luxury property on the internet's most highly visible websites, for example: {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">REALTOR.COM</Link>, {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">PALM BEACH CHAMBER OF COMMERCE.COM</Link>, {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">WALL STREET JOURNAL.COM</Link>, {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">MANSION GLOBAL.COM</Link>.
                </p>
                <img
                  src="/grlinda2.jpg"
                  alt="Palm Beach Luxury Properties"
                  className="w-[180px] h-auto rounded-lg shadow-lg float-right"
                />
              </div>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                Our testimonials speak for themselves. Please take a moment of your time to preview our outstanding testimonials from our exceptional clients who continue to refer their friends, family, and associates to us. Our worldwide clientele extends from Palm Beach, Nantucket, Greenwich to N.H. Harbor, Maine... to Westchester to the Hampton's, Greenwich, Connecticut... to Atlantic City, New Jersey... to Chicago, Las Vegas... to Aspen, Deer Valley, to Jackson Hole and Montana... to La Costa Beach, Montecita, California... to Paris, IL... to Hong, London, Copenhagen, Stockholm, Denmark and Prague... We are thankful each year to every one of our loyal clients, and we hope to have the opportunity to service all your real estate needs.
              </p>

              <div className="text-center">
                <Link href="#" className="text-[#1b4e1f] underline hover:no-underline text-xl">
                  Click here to view our testimonials from satisfied customers.
                </Link>
              </div>

              <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-2xl text-[#1b4e1f] font-semibold text-center mb-4">
                  If you are thinking about buying, selling or leasing in Palm Beach or the surrounding area...Call Linda and her team of Professionals... We get Results!
                </p>
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