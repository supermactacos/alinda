"use client";

import { Instrument_Serif } from "next/font/google"
import { ArrowRight, X } from "lucide-react"
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

export default function NewsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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

  const newsItems = [
    {
      title: "Is Jon Bon Jovi linked to a house buy near his Palm Beach mansion?",
      image: "/news15.jpg",
      alt: "Jon Bon Jovi Palm Beach Property",
      url: "https://www.palmbeachdailynews.com/story/business/real-estate/2025/05/20/is-jon-bon-jovi-linked-to-a-house-buy-near-his-palm-beach-mansion/83729753007/"
    },
    {
      title: "Sun and Surf Penthouse at 130 Sunrise Avenue sells for less than previous price",
      image: "/news16.jpg",
      alt: "Palm Beach Penthouse",
      url: "https://www.palmbeachdailynews.com/story/business/real-estate/2025/02/21/palm-beach-penthouse-sells-for-a-bit-less-than-it-did-when-it-last-sold-in-2023/79441229007/"
    },
    {
      title: "Palm Beach house at 350 Seaspray Avenue sells as new house waits in the wings",
      image: "/news17.jpg",
      alt: "350 Seaspray Avenue Palm Beach",
      url: "https://www.palmbeachdailynews.com/story/business/real-estate/2023/12/22/forida-real-estate-palm-beach-house-sells-for-7-million-as-new-house-waits-in-the-wings-for-the-lot/72009347007/"
    },
    {
      title: "Palm Beach house linked to former diplomat sells twice in about a year",
      image: "/news18.jpg",
      alt: "130 Cocoanut Row Palm Beach",
      url: "https://www.palmbeachdailynews.com/story/business/real-estate/2024/06/18/palm-beach-house-linked-to-former-diplomat-sells-twice-in-about-a-year/73997207007/"
    },
    {
      title: "Palm Beach spec house near Trump's Mar-a-Lago brings nearly $30 million",
      image: "/news19.jpg",
      alt: "1080 South Ocean Blvd Palm Beach",
      url: "https://www.palmbeachdailynews.com/story/business/real-estate/2024/02/05/palm-beach-florida-spec-house-near-trump's-mar-a-lago-brings-nearly-30-million-real-estate/72480582007/"
    },
    {
      title: "Neighbor buys Palm Beach house next door, expanding his local holdings",
      image: "/news20.jpg",
      alt: "1515 N. Ocean Way Palm Beach",
      url: "https://www.palmbeachdailynews.com/story/business/real-estate/2024/07/22/neighbor-buys-palm-beach-house-next-door-expanding-his-local-holdings/74460637007/"
    },
    {
      title: "House on a rare hillside lot in Palm Beach sells for more than $15 million",
      image: "/news21.jpg",
      alt: "309 Chapel Hill Road Palm Beach",
      url: "https://www.palmbeachdailynews.com/story/business/real-estate/2023/11/07/florida-real-estate-house-on-a-rare-hillside-lot-in-palm-beach-sells-for-more-than-15-million/71472425007/"
    },
    {
      title: "Sale of house built in 2007 tops $25 million in Midtown Palm Beach",
      image: "/news22.jpg",
      alt: "200 Clarke Avenue Palm Beach",
      url: "https://www.palmbeachdailynews.com/story/business/real-estate/2021/11/12/sale-house-built-2007-tops-25-million-midtown-palm-beach/8591670002/"
    },
    {
      title: "Palm Beach couple sells house for $15.2 million near North End",
      image: "/news23.jpg",
      alt: "167 Everglades Avenue Palm Beach",
      url: "https://www.palmbeachdailynews.com/story/business/real-estate/2021/08/17/palm-beach-couple-sells-house-15-2-million-near-north-end-mls/8168128002/"
    },
    {
      title: "Designer Scott Snyder sells landmarked office-residence in Palm Beach",
      image: "/news24.jpg",
      alt: "209 Phipps Plaza Palm Beach",
      url: "https://www.palmbeachdailynews.com/story/business/real-estate/2021/05/17/designer-scott-snyder-sells-landmarked-office-residence-palm-beach/5126071001/"
    },
    
    {
      title: "Ten condo, co-op deals hit $5 million mark last year",
      image: "/news2.jpg",
      alt: "Palm Beach Luxury Condos",
      url: "https://www.palmbeachdailynews.com/news/20190104/palm-beach-homes-ten-condo-co-op-deals-hit-5-million-mark-last-year"
    },
    {
      title: "Sale prices of two Worth Avenue apartments hit $7 million in Palm Beach",
      image: "/news3.jpg",
      alt: "Worth Avenue Apartments",
      url: "https://www.palmbeachdailynews.com/business/real-estate/sale-prices-two-worth-avenue-apartments-hit-million-palm-beach/MBGfkuQW9ijQL7reawgyLN/"
    },
    {
      title: "Reports: Single-Family sales broke out of doldrums in fourth quarter",
      image: "/news4.jpg",
      alt: "Palm Beach Single Family Home",
      url: "http://www.palmbeachdailynews.com/business/real-estate/reports-single-family-sales-broke-out-doldrums-fourth-quarter/ABBPBUEBPj3PQ1B7BZUbqL/"
    },
    {
      title: "Midtown makeover: Palm Beachers renovated 2-story home inside and out",
      image: "/news5.png",
      alt: "Renovated Palm Beach Home",
      url: "http://www.palmbeachdailynews.com/business/real-estate/midtown-makeover-palm-beachers-renovated-story-home-inside-and-out/BxfH5GUrgmb0f21ktAxT3I/"
    },
    {
      title: "After Hurricane Irma, real estate broker checks up on Palm Beach homes",
      image: "/news6.png",
      alt: "Palm Beach Homes After Hurricane",
      url: "http://www.palmbeachdailynews.com/business/real-estate/after-hurricane-irma-real-estate-broker-checks-palm-beach-homes/00s1ufZsmFAbLwDIqINqtM/"
    },
    {
      title: "120 Atlantic Avenue sells for $5.8M",
      image: "/news7.png",
      alt: "120 Atlantic Avenue Property",
      url: "http://www.palmbeachdailynews.com/business/real-estate/wow-when-you-walk-120-atlantic-ave-sells-for-million/dOWFL1TKqKbXZu0gqPrNWN/"
    },
    {
      title: "Real Estate Pros Make the Rounds After Storm",
      image: "/news8.png",
      alt: "Palm Beach After Storm",
      url: "http://www.palmbeachdailynews.com/news/news/local/real-estate-pros-make-the-rounds-after-storm/nsnx2/"
    },
    {
      title: "Palm Beach Daily News August 2016",
      image: "/news9.png",
      alt: "Palm Beach Daily News Coverage",
      url: "http://www.palmbeachdailynews.com/news/business/real-estate/renovation-gives-palm-beach-oceanview-condo-a-fres/nsK3n/"
    },
    {
      title: "Palm Beach Daily News April 2016",
      image: "/news10.jpg",
      alt: "Palm Beach Real Estate News",
      url: "http://www.palmbeachdailynews.com/news/business/real-estate/rare-worth-ave-apartment-villas-fetches-premium-pr/nq5mC/"
    },
    {
      title: "Avenue Magazine January 2016",
      image: "/news11.jpg",
      alt: "Avenue Magazine Coverage",
      url: "https://issuu.com/avenueinsider/docs/avenue_january_2016?e=2748745/32271621"
    },
    {
      title: "Palm Beach Daily News July 2015",
      image: "/news12.png",
      alt: "Palm Beach Property News",
      url: "http://www.palmbeachdailynews.com/news/business/real-estate/beyond-the-hedges-spate-of-real-estate-closings-a-/nmzY6/"
    },
    {
      title: "Palm Beach Daily News June 2015",
      image: "/news13.jpg",
      alt: "Palm Beach Real Estate Updates",
      url: "http://www.palmbeachdailynews.com/news/news/local/island-real-estate-agents-ranked-on-top-250-lists/nmmhN/"
    },
    {
      title: "Palm Beach Daily News April 2014",
      image: "/news14.jpg",
      alt: "Palm Beach Market News",
      url: "http://www.palmbeachdailynews.com/news/news/local/a-lifelong-commitment/nfc7b/"
    }
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
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
          {/* Main Section */}
          <section className="pt-32 bg-white">
            <div className="container mx-auto px-4">
              <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
                In The News
              </h1>

              <div className="space-y-12 max-w-4xl mx-auto">
                {newsItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col w-full">
                    <div 
                      className="relative w-full overflow-hidden cursor-pointer"
                      onClick={() => openModal(index)}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full object-contain transition-transform duration-300 hover:scale-105 max-h-[800px]"
                      />
                    </div>
                    <div className="p-8 flex flex-col items-center text-center">
                      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      <Link 
                        href={item.url}
                        className="inline-flex items-center text-[#1b4e1f] hover:text-[#143917] transition-colors text-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Image Modal */}
          {selectedImage !== null && (
            <div 
              className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div 
                className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                  onClick={closeModal}
                >
                  <X className="h-6 w-6 text-gray-900" />
                </button>
                
                <div className="h-[75vh] overflow-hidden">
                  <img
                    src={newsItems[selectedImage].image}
                    alt={newsItems[selectedImage].alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {newsItems[selectedImage].title}
                  </h3>
                  <Link 
                    href={newsItems[selectedImage].url}
                    className="inline-flex items-center text-[#1b4e1f] hover:text-[#143917] transition-colors text-lg py-2 px-4 border border-[#1b4e1f] rounded-md hover:bg-[#1b4e1f]/5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Contact Card Section */}
          <ContactCard />

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  )
} 