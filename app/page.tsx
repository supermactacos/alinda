"use client";

import Link from "next/link"
import { Menu, MapPin, ArrowRight, Star, Calendar, Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Instrument_Serif } from "next/font/google"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { TextAnimate } from "@/components/magicui/text-animate"
import { testimonials } from "./data/testimonials"
import { Navbar } from "@/components/Navbar"
import { Footer } from "./components/Footer"
import { IdxFeaturedProperties } from "./components/IdxFeaturedProperties"
import { ContactCard } from "./components/ContactCard"
import { useState, useEffect } from "react"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function Home() {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  
  // Use useEffect to set a timer for showing content
  useEffect(() => {
    // Start fading out the loading screen after 1.5 seconds
    const fadeOutTimer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1500);
    
    // Show content after 2 seconds (giving 0.5s for the fade-out animation)
    const contentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 2000);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(contentTimer);
    }; // Cleanup on unmount
  }, []);
  
  // Track scroll position for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Change to green after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("Sending...");

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "d91d1c9b-e5f6-47df-abe1-0306225ab6bf");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("Thank you for your message. We'll get back to you soon!");
        (event.target as HTMLFormElement).reset();
      } else {
        console.log("Error", data);
        setFormStatus("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFormStatus("There was an error sending your message. Please try again.");
    }
  };
  
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

      {/* Main Content with hero section having video background */}
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Navigation - Moved outside hero section */}
        <div className={`fixed top-0 left-0 right-0 z-[40] w-full transition-all duration-300 ${
          isScrolled ? 'bg-[#1b4e1f]' : 'bg-transparent'
        } ${loadingVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Navbar isScrolled={isScrolled} />
        </div>

        {/* Hero Section with contained video background */}
        <div className={`relative h-screen transition-transform duration-500 ease-in-out ${
          loadingVisible ? 'translate-y-0' : 'translate-y-0'
        }`}>
          {/* Video background contained within hero section */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
            >
              <source src="/video.mp4" type="video/mp4" />
              <img 
                src="/bgtest.png" 
                alt="Background" 
                className="absolute top-0 left-0 w-full h-full object-cover" 
              />
            </video>
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="text-white p-12  ">
              <p className={`text-3xl md:text-4xl lg:text-5xl mb-6  ${instrumentSerif.className}`}>Palm Beach Real Estate</p>
              <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-3 mt-3 text-white relative inline-block ${instrumentSerif.className}`}>
                <span className="relative z-10">Linda <span className="text-white">R.</span> Olsson</span>
                <div className="absolute inset-0 -m-8 -z-[1]"></div>
              </h1>
              <p className={`text-2xl md:text-3xl lg:text-4xl mb-10 text-white ${instrumentSerif.className}`}>Representing buyers and sellers of Palm Beach's Finest Residences since 1989</p>
              <div className="flex justify-center gap-8">
                <Link href="/properties" className={`px-5 py-5 text-2xl md:text-4xl bg-[#1b4e1f] hover:bg-green-900/90 transition-colors text-white rounded-lg ${instrumentSerif.className} flex items-center`}>
                  Find Your Dream Home Today
                  <ArrowRight className="h-10 w-10 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Linda Section - Always visible, no transitions */}
        <div className="bg-white will-change-transform">
          <section className="relative py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="relative w-[71.4%] md:ml-28 mx-auto md:mx-0">
                  <img
                    src="/linda.png"
                    alt="Linda R. Olsson"
                    className="relative z-20 w-full object-contain shadow-xl rounded-lg border-t border-l border-r border-gray-100"
                    style={{
                      backgroundColor: '#f3f4f6',
                      borderRadius: '0.5rem',
                    }}
                  />
                </div>
                <div className="pt-8">
                  <h2 className={`text-7xl font-light mb-6 ${instrumentSerif.className}`}>Thinking About Buying or Selling in Palm Beach?</h2>
                  <p className="text-black mb-8 leading-relaxed text-3xl">
                  With over 30 years of experience selling Luxury Homes in Palm Beach, Linda and her associates have gained a vast knowledge of Palm Beach, its people, and its history-knowledge we put to daily use to help our clients.
                  </p>
                  <p className="text-black mb-8 leading-relaxed text-3xl">
                  <strong className="text-green-900">We Get Results! </strong>
                  We take great pride in utilizing our experience, resources, and global connections to unite extraordinary people with extraordinary properties.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="gap-2 text-3xl bg-green-900 text-white px-6 py-8 rounded-lg">
                      Contact Us
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Rest of the content that fades in */}
        <div className={`bg-white transition-opacity duration-500 ease-in-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* News Ticker Section */}
          <section className="pb-16">
            <div className="container mx-auto px-4">
              <h2 className={`text-4xl text-center font-light mb-12 ${instrumentSerif.className}`}>As Seen On</h2>
              <div className="relative overflow-hidden max-w-7xl mx-auto">
                {/* Add gradient masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
                
                <div className="ticker-container">
                  <div className="ticker">
                    {/* First set with more logos and increased spacing */}
                
                
                    <div className="ticker-item">
                      <img src="/pbdnx.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/illus.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/wsj.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/housingwire.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/wpbf.png" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/Zillow.png" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/pbdnx.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/illus.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    
                    {/* Duplicate set */}
                    <div className="ticker-item">
                      <img src="/housingwire.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/illus.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/wsj.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/pbdnx.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/illus.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/wpbf.png" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/Zillow.png" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/illus.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/merc-2.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Location Selection Section - Search by Neighborhood */}
          <section className="relative bg-[#fcfcfc] py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className={`text-6xl mb-6 text-green-800 font-bold ${instrumentSerif.className}`}>Search by Neighborhood</h2>
                <p className="text-gray-600 text-2xl">Luxury Real Estate in Palm Beach, Florida</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                  {
                    name: "North End Homes",
                    image: "/northend.svg?height=600&width=600",
                    description: "Luxury Palm Beach Living",
                    location: "East Inlet Drive South to Wells Road",
                    details: "Palm Beach homes, Single Family, Waterfront: Ocean and Intracoastal. The North End offers a variety of one and two story homes...",
                  },
                  {
                    name: "In Town Homes",
                    image: "/intown.svg?height=600&width=600",
                    description: "Historic Charm & Elegance",
                    location: "Wells Road South to Worth Avenue",
                    details: "Palm Beach condos and Single Family Homes, Waterfront: Ocean and Intracoastal. In-Town, Mid-Town, or between the bridges, is more of...",
                  },
                  {
                    name: "Estate Section Homes",
                    image: "/estatesection.svg?height=600&width=600",
                    description: "Prestigious Oceanfront Estates",
                    location: "Worth Avenue South to Sloan's Curve",
                    details: "Palm Beach Oceanfront Estates, Intracoastal Estates, and Single Family Homes. Featuring formal gardens, gated entries, and lavish...",
                  },
                  {
                    name: "In Town Condominiums",
                    image: "/condo1.svg?height=600&width=600",
                    description: "Sophisticated Urban Living",
                    location: "Wells Road South to Worth Avenue",
                    details: "Palm Beach condominiums and co-ops are along South Ocean Boulevard from Royal Poinciana Way South to Worth Avenue, and along Lake Trail",
                  },
                ].map((location) => (
                  <div key={location.name} className="group flex flex-col h-full">
                    <a 
                      href={
                        location.name === "North End Homes" ? "/north-end-palm-beach-real-estate" :
                        location.name === "In Town Homes" ? "/in-town-palm-beach-real-estate" :
                        location.name === "Estate Section Homes" ? "/estate-section" :
                        "/in-town-condos"
                      }
                      className="block"
                    >
                      <div className="relative aspect-[1/1] mb-6">
                        <div className="absolute inset-[12px] border border-white/50 z-10" />
                        <img
                          src={location.image}
                          alt={location.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className={`text-3xl font-semibold uppercase tracking-wider mb-3 ${instrumentSerif.className}`}>{location.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-5 w-5 text-gray-600" />
                          <p className="text-gray-900 font-medium text-lg">{location.location}</p>
                        </div>
                      </div>
                    </a>
                    <div className="flex flex-col flex-grow">
                      <p className="text-gray-600 mb-4 text-2xl flex-grow">{location.details}</p>
                      <a 
                        href={
                          location.name === "North End Homes" ? "/north-end-palm-beach-real-estate" :
                          location.name === "In Town Homes" ? "/in-town-palm-beach-real-estate" :
                          location.name === "Estate Section Homes" ? "/estate-section" :
                          "/in-town-condos"
                        }
                        className="flex items-center gap-2 text-gray-600 group-hover:text-black transition-colors mt-auto"
                      >
                        <span className="uppercase text-base tracking-wider">Search</span>
                        <ArrowRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Search for Homes */}
          <section className="py-32 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className={`text-6xl font-light mb-6 text-green-800 ${instrumentSerif.className}`}>Search by Price</h2>
                <p className="text-gray-600 text-2xl">Find your dream home today.</p>
              </div>
              
              <div className="space-y-8">
                {/* Homes Section */}
                <div>
                  <h3 className={`text-3xl mb-6 text-center ${instrumentSerif.className}`}>Palm Beach Homes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <a href="http://mlspalmbeach.lindaolsson.com/i/1_to_4_million" className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      1 to 4 million
                    </a>
                    <a href="http://mlspalmbeach.lindaolsson.com/i/4_to_8_million" className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      4 to 8 million
                    </a>
                    <a href="http://mlspalmbeach.lindaolsson.com/i/8_to_12_million" className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      8 to 12 million
                    </a>
                    <a href="http://mlspalmbeach.lindaolsson.com/i/12_to_22_million" className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      12 to 22 million
                    </a>
                    <a href="http://mlspalmbeach.lindaolsson.com/i/22millionto100million" className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      22 to 100 million
                    </a>
                    <a href="https://mlspalmbeach.lindaolsson.com/i/100-million-to-200-million" className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      100 to 200 million
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <a href="http://mlspalmbeach.lindaolsson.com/i/WaterfrontHomesPalmBeach" className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      Waterfront
                    </a>
                    <a href="http://mlspalmbeach.lindaolsson.com/i/homes-for-rent-in-palm-beach" className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      Homes for Rent
                    </a>
                  </div>
                </div>

                {/* Condos Section */}
                <div>
                  <h3 className={`text-3xl mb-6 text-center pt-8 ${instrumentSerif.className}`}>Palm Beach Condominiums</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="http://mlspalmbeach.lindaolsson.com/i/CONDOS_FROM_500K_TO_1M" className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      500,000 to 1 million
                    </a>
                    <a href="http://mlspalmbeach.lindaolsson.com/i/CONDOS_FROM_1M_to_2M" className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      1 to 2 million
                    </a>
                    <a href="http://mlspalmbeach.lindaolsson.com/i/CONDOS_2_TO_4_MILLION" className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      2 to 4 million
                    </a>
                    <a href="http://mlspalmbeach.lindaolsson.com/i/CONDOS_FROM_4M_up_to_12M" className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      4 to 12 million
                    </a>
                    <a href="https://mlspalmbeach.lindaolsson.com/i/12-to-50-million-condos" className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      12 to 50 million
                    </a>
                    <a href="https://mlspalmbeach.lindaolsson.com/i/50-to-75-million-condos" className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      50 to 75 million
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <a href="https://mlspalmbeach.lindaolsson.com/i/75-to-150-million-condos" className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      75 to 150 million
                    </a>
                    <a href="http://mlspalmbeach.lindaolsson.com/i/PalmBeachWaterfrontCondos-Condos" className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      Waterfront Condos
                    </a>
                    <a href="http://mlspalmbeach.lindaolsson.com/i/condos-for-rent-in-palm-beach" className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors text-center flex items-center justify-center">
                      Condos for Rent
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Properties */}
          <section className="py-32 bg-[#fcfcfc]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className={`text-6xl font-light mb-6 text-green-800 ${instrumentSerif.className}`}>Featured Properties</h2>
                <p className="text-gray-600 text-2xl">Specializing in Palm Beach Luxury Properties...From Pieds A' Terres to Oceanfront Estates</p>
              </div>
              <IdxFeaturedProperties />
            </div>
          </section>

          {/* Contact Card Section */}
          <ContactCard />

          {/* Testimonials */}
          <section className="py-32 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className={`text-6xl font-light mb-6 text-green-800 ${instrumentSerif.className}`}>Testimonials</h2>
                <p className="text-gray-600 text-2xl">What Our Clients Say About Us</p>
              </div>
              {(() => {
                const [api, setApi] = React.useState<CarouselApi>()
                
                React.useEffect(() => {
                  if (!api) return
                
                  const interval = setInterval(() => {
                    api.scrollNext()
                  }, 2000)
                
                  return () => clearInterval(interval)
                }, [api])

                return (
                  <Carousel
                    className="w-full"
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    setApi={setApi}
                  >
                    <CarouselContent>
                      {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                          <div className="p-10 mx-5 bg-gray-50 rounded-lg h-full flex flex-col">
                            {/* Profile Section - Always at the top */}
                            <div className="flex items-center gap-5 mb-8">
                              <div className="flex-shrink-0">
                                
                              </div>
                              <div>
                                <p className={`font-medium text-2xl ${instrumentSerif.className}`}>{testimonial.author}</p>
                                <p className="text-green-800 text-lg">{testimonial.location}</p>
                                <p className="text-green-800 text-base">{testimonial.type}</p>
                              </div>
                            </div>
                            
                            {/* Quote Section */}
                            <div className="relative flex-grow">
                              <div className="absolute -left-3 -top-3 text-7xl text-gray-200 font-serif">"</div>
                              <blockquote className="relative z-10 pl-5 text-gray-700 leading-relaxed italic text-xl">
                                {testimonial.quote.length > 350 
                                  ? `${testimonial.quote.substring(0, 350).split(' ').slice(0, -1).join(' ')}...` 
                                  : testimonial.quote}
                              </blockquote>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                  </Carousel>
                )
              })()}
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 bg-[#f8f8f8]">
            <div className="container mx-auto px-4">
              <h2 className={`text-6xl font-light mb-12 text-center text-[#1b4e1f] pb-20 ${instrumentSerif.className}`}>
                Schedule A Consultation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className={`text-4xl font-light mb-8 text-[#1b4e1f] ${instrumentSerif.className}`}>
                    Get in Touch
                  </h3>
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#1b4e1f] text-white p-3 rounded-full">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Phone</h3>
                        <p className="text-gray-600 mb-1">Office: <a href="tel:5618209195" className="text-[#1b4e1f] hover:underline">(561) 820-9195</a></p>
                        <p className="text-gray-600">Cell: <a href="tel:5613294044" className="text-[#1b4e1f] hover:underline">(561) 329-4044</a></p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-[#1b4e1f] text-white p-3 rounded-full">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Email</h3>
                        <p className="text-gray-600">
                          <a href="mailto:linda@lindaolsson.com" className="text-[#1b4e1f] hover:underline">linda@lindaolsson.com</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-[#1b4e1f] text-white p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Office Location</h3>
                        <p className="text-gray-600 mb-1">Linda R. Olsson, Inc., Realtor</p>
                        <p className="text-gray-600 mb-1">101 Bradley Place</p>
                        <p className="text-gray-600">Palm Beach, FL 33480</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className={`text-4xl font-light mb-8 text-[#1b4e1f] ${instrumentSerif.className}`}>
                    Send Us a Message
                  </h3>
                  {formStatus && (
                    <div className={`mb-6 p-4 rounded-md ${
                      formStatus.includes("error") 
                        ? "bg-red-50 text-red-700 border border-red-200" 
                        : "bg-green-50 text-green-700 border border-green-200"
                    }`}>
                      {formStatus}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          id="name" 
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b4e1f]" 
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input 
                          type="tel" 
                          name="phone"
                          id="phone" 
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b4e1f]" 
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        id="email" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b4e1f]" 
                        placeholder="Your email address"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input 
                        type="text" 
                        name="subject"
                        id="subject" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b4e1f]" 
                        placeholder="Message subject"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea 
                        id="message" 
                        name="message"
                        rows={6} 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b4e1f]" 
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    
                    <div>
                      <Button 
                        type="submit" 
                        className="bg-[#1b4e1f] hover:bg-[#173e1a] text-white py-3 px-6 rounded-md flex items-center gap-2"
                      >
                        Send Message
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      <style jsx>{`
        .ticker-container {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        
        .ticker {
          display: flex;
          position: relative;
          width: max-content;
          animation: ticker 40s linear infinite;
        }
        
        .ticker-item {
          flex-shrink: 0;
        }
        
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  )
}


