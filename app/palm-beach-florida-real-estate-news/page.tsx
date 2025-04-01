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

export default function NewsPage() {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1500);
    
    const contentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 2000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(contentTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const newsItems = [
    {
      title: "Sale recorded at $122.7M seaside 'spec' house sets new record in Palm Beach",
      image: "/news1.jpg",
      alt: "Palm Beach Luxury Seaside House"
    },
    {
      title: "Ten condo, co-op deals hit $5 million mark last year",
      image: "/news2.jpg",
      alt: "Palm Beach Luxury Condos"
    },
    {
      title: "Sale prices of two Worth Avenue apartments hit $7 million in Palm Beach",
      image: "/news3.jpg",
      alt: "Worth Avenue Apartments"
    },
    {
      title: "Reports: Single-Family sales broke out of doldrums in fourth quarter",
      image: "/news4.jpg",
      alt: "Palm Beach Single Family Home"
    },
    {
      title: "Midtown makeover: Palm Beachers renovated 2-story home inside and out",
      image: "/news5.png",
      alt: "Renovated Palm Beach Home"
    },
    {
      title: "After Hurricane Irma, real estate broker checks up on Palm Beach homes",
      image: "/news6.png",
      alt: "Palm Beach Homes After Hurricane"
    },
    {
      title: "120 Atlantic Avenue sells for $5.8M",
      image: "/news7.png",
      alt: "120 Atlantic Avenue Property"
    },
    {
      title: "Real Estate Pros Make the Rounds After Storm",
      image: "/news8.png",
      alt: "Palm Beach After Storm"
    },
    {
      title: "Palm Beach Daily News August 2016",
      image: "/news9.png",
      alt: "Palm Beach Daily News Coverage"
    },
    {
      title: "Palm Beach Daily News April 2016",
      image: "/news10.jpg",
      alt: "Palm Beach Real Estate News"
    },
    {
      title: "Avenue Magazine January 2016",
      image: "/news11.jpg",
      alt: "Avenue Magazine Coverage"
    },
    {
      title: "Palm Beach Daily News July 2015",
      image: "/news12.png",
      alt: "Palm Beach Property News"
    },
    {
      title: "Palm Beach Daily News June 2015",
      image: "/news13.jpg",
      alt: "Palm Beach Real Estate Updates"
    },
    {
      title: "Palm Beach Daily News April 2014",
      image: "/news14.jpg",
      alt: "Palm Beach Market News"
    }
  ];

  return (
    <>
      {/* Loading overlay with slide-up transition */}
      <div 
        className={`fixed inset-0 bg-green-800 z-[200] flex items-center justify-center transition-all duration-500 ease-in-out ${
          loadingVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-white text-center p-12">
          <div className={`text-7xl md:text-8xl lg:text-9xl font-light mb-3 mt-3 text-white ${instrumentSerif.className}`}>
            <TextAnimate 
              animation="slideUp" 
              by="word"
              className={`${instrumentSerif.className} block`}
              duration={0.5}
              delay={0}
              once
              startOnView={false}
            >
              Linda R. Olsson
            </TextAnimate>
          </div>
          <p className={`text-xl text-pink-200 ${instrumentSerif.className}`}>Loading...</p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="fixed top-0 left-0 right-0 z-[40] bg-[#1b4e1f] shadow-lg">
          <Navbar isScrolled={isScrolled} alwaysSolid />
        </div>
        
        <main className="relative min-h-screen w-full overflow-x-hidden pt-[120px]">
          {/* Main Section */}
          <section className="pt-32 bg-white">
            <div className="container mx-auto px-4">
              <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
                In The News
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {newsItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <Link 
                        href="#"
                        className="inline-flex items-center text-[#1b4e1f] hover:text-[#143917] transition-colors"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Card Section */}
          <section className="pt-16 pb-24 bg-white">
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
      </div>
    </>
  )
} 