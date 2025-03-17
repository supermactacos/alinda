"use client";

import Link from "next/link"
import { Menu, MapPin, ArrowRight, Star, Calendar, Phone, Mail } from "lucide-react"
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

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function Home() {
  const [loadingVisible, setLoadingVisible] = React.useState(true);
  const [contentVisible, setContentVisible] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  // Use useEffect to set a timer for showing content
  React.useEffect(() => {
    // Start fading out the loading screen after 1.5 seconds
    const fadeOutTimer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1500);
    
    // Show content after 2 seconds (giving 0.5s for the fade-out animation)
    const contentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 2000);

    // Add scroll event listener
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Change to green after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(contentTimer);
      window.removeEventListener('scroll', handleScroll);
    }; // Cleanup on unmount
  }, []);
  
  return (
    <>
      {/* Loading overlay with slide-up transition */}
      <div 
        className={`fixed inset-0 bg-green-800 z-50 flex items-center justify-center transition-all duration-500 ease-in-out ${
          loadingVisible 
            ? 'translate-y-0' 
            : '-translate-y-full'
        }`}
      >
        <div className="text-white text-center p-12">
          <div className={`text-7xl md:text-8xl lg:text-9xl font-light mb-3 mt-3 text-white relative overflow-hidden ${instrumentSerif.className}`}>
            <TextAnimate 
              animation="slideUp" 
              by="word"
              className={`${instrumentSerif.className} block`}
              duration={0.8}
              delay={0.2}
              once
            >
              Linda R. Olson
            </TextAnimate>
          </div>
          <p className={`text-xl text-pink-200 ${instrumentSerif.className}`}>Loading...</p>
        </div>
      </div>

      {/* Main Content with hero section having video background */}
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Navigation - Moved outside hero section */}
        <nav className={`fixed top-0 left-0 right-0 z-[100] w-full py-8 px-4 transition-all duration-300 ${
          isScrolled ? 'bg-[#1b4e1f]' : 'bg-transparent'
        } ${loadingVisible ? 'opacity-0' : 'opacity-100'}`}>
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-2 text-white text-lg">
                <Menu className="h-8 w-8" />
                <span>Menu</span>
              </button>
              <div className="hidden md:flex items-center gap-6">
                <div className="relative group">
                  <button className="text-white text-lg flex items-center gap-1">
                    Properties
                    <span className="ml-1"></span>
                  </button>
                </div>
                <Link href="#" className="text-white text-lg">
                  Home Search
                </Link>
              </div>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <img src="/flogo.svg" alt="Logo" className="h-20 mr-10" />
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-6">
              <Link href="#" className="text-white text-lg">
                Market Reports
              </Link>
              <Link href="#" className="text-white hidden md:block text-lg">
                Contact Us
              </Link>
              <Link href="tel:(561) 313-6504" className="text-white text-lg">
                (561) 313-6504
              </Link>
            </div>
          </div>
        </nav>

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
                <span className="relative z-10">Linda <span className="text-white">R.</span> Olson</span>
                <div className="absolute inset-0 -m-8 -z-[1]"></div>
              </h1>
              <p className={`text-2xl md:text-3xl lg:text-4xl mb-10 text-white ${instrumentSerif.className}`}>Representing buyers and sellers of Palm Beach's Finest Residences since 1989</p>
              <div className="flex justify-center gap-8">
                <button className={`px-5 py-5 text-2xl md:text-4xl bg-[#1b4e1f] hover:bg-green-900/90 transition-colors text-white rounded-lg ${instrumentSerif.className} flex items-center`}>
                  Find Your Dream Home Today
                  <ArrowRight className="h-10 w-10 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Linda Section - Always visible, no transitions */}
        <div className="bg-white will-change-transform">
          <section className="relative py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="relative w-[71.4%] ml-28">
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
                  <h2 className={`text-7xl font-light mb-6 ${instrumentSerif.className}`}>Meet Linda</h2>
                  <p className="text-black mb-8 leading-relaxed text-3xl">
                  Owner/Broker and Founder of Linda R. Olsson, Inc., Realtor, a boutique real estate firm specializing in Palm Beach luxury properties. With over 30 years of experience in Palm Beach real estate, Linda has been recognized by the Wall Street Journal as one of "America's Best Real Estate Agents."
                  </p>
                  <p className="text-black mb-8 leading-relaxed text-3xl">
                  <strong className="text-green-900">Thinking About Buying or Selling in Palm Beach? </strong>
                  Linda Olsson has been specializing in Palm Beach luxury properties for over 30 years. Contact us for experience you can TRUST!
                  </p>
                  <Button variant="outline" size="lg" className="gap-2 text-3xl bg-green-900 text-white px-6 py-8 rounded-lg">
                    Contact Us
                    <ArrowRight className="h-5 w-5" />
                  </Button>
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
                      <img src="/mercer-island.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/merc-2.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
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
                      <img src="/mercer-island.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/merc-2.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    
                    {/* Duplicate set */}
                    <div className="ticker-item">
                      <img src="/housingwire.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/merc-2.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/wsj.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/mercer-island.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/wpbf.png" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/Zillow.png" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
                    </div>
                    <div className="ticker-item">
                      <img src="/mercer-island.svg" alt="Media Logo" className="h-8 grayscale hover:grayscale-0 transition-all mx-16" />
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
                <p className="text-gray-600 text-2xl">Luxury Real Estate in South Florida's Most Desirable Locations</p>
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
                    image: "/condo.svg?height=600&width=600",
                    description: "Sophisticated Urban Living",
                    location: "South of the Estate Section along S Ocean Blvd",
                    details: "The exclusive Sloan's Curve condominium complex. The approximate three mile strip of gorgeous oceanfront properties and coastline.",
                  },
                ].map((location) => (
                  <div key={location.name} className="group flex flex-col h-full">
                    <div className="relative aspect-[1/1] mb-6">
                      <div className="absolute inset-[12px] border border-white/50 z-10" />
                      <img
                        src={location.image}
                        alt={location.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className={`text-3xl font-semibold uppercase tracking-wider mb-3 ${instrumentSerif.className}`}>{location.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-5 w-5 text-gray-600" />
                        <p className="text-gray-900 font-medium text-lg">{location.location}</p>
                      </div>
                      <p className="text-gray-600 mb-4 text-2xl flex-grow">{location.details}</p>
                      <div className="flex items-center gap-2 text-gray-600 group-hover:text-black transition-colors mt-auto">
                        <span className="uppercase text-base tracking-wider">Search</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
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
                    <button className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      1 to 4 million
                    </button>
                    <button className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      4 to 8 million
                    </button>
                    <button className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      8 to 12 million
                    </button>
                    <button className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      12 to 22 million
                    </button>
                    <button className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      22 to 100 million
                    </button>
                    <button className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      100 to 200 million
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <button className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      Waterfront
                    </button>
                    <button className="bg-gray-200 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      Homes for Rent
                    </button>
                  </div>
                </div>

                {/* Condos Section */}
                <div>
                  <h3 className={`text-3xl mb-6 text-center pt-8 ${instrumentSerif.className}`}>Palm Beach Condominiums</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      1 to 2 million
                    </button>
                    <button className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      2 to 4 million
                    </button>
                    <button className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      4 to 12 million
                    </button>
                    <button className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      12 to 50 million
                    </button>
                    <button className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      50 to 75 million
                    </button>
                    <button className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      Waterfront Condos
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <button className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                    In-Town Condos
                    </button>
                    <button className="bg-gray-100 hover:bg-pink-200 text-gray-800 rounded-lg p-4 text-2xl transition-colors">
                      Condos for Rent
                    </button>
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
                <p className="text-gray-600 text-2xl">Discover Our Exclusive Listings</p>
              </div>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {[
                    {
                      price: "$95,000,000",
                      image: "https://cdn.photos.sparkplatform.com/pbb/20241106170305259145000000-o.jpg",
                      address: "1460 N Lake Way",
                      city: "Palm Beach",
                      state: "Florida",
                      beds: "6",
                      baths: "9",
                      sqft: "15,994",
                      link: "http://mlspalmbeach.lindaolsson.com/idx/details/listing/b294/24-1411/1460-N-Lake-Way-Palm-Beach-33480"
                    },
                    {
                      price: "$95,000,000",
                      image: "https://cdn.photos.sparkplatform.com/pbb/20240813144505682680000000-o.jpg",
                      address: "1140 S Ocean Boulevard",
                      city: "Manalapan",
                      state: "Florida",
                      beds: "13",
                      baths: "16",
                      sqft: "23,399",
                      acres: "1.6",
                      link: "http://mlspalmbeach.lindaolsson.com/idx/details/listing/b294/24-1168/1140-S-Ocean-Boulevard-Manalapan-33462"
                    },
                    {
                      price: "$88,000,000",
                      image: "https://cdn.photos.sparkplatform.com/pbb/20241014164939969869000000-o.jpg",
                      address: "1540 S Ocean Boulevard",
                      city: "Palm Beach",
                      state: "Florida",
                      beds: "8",
                      baths: "15",
                      sqft: "16,571",
                      acres: "0.98",
                      link: "http://mlspalmbeach.lindaolsson.com/idx/details/listing/b294/24-1488/1540-S-Ocean-Boulevard-Palm-Beach-33480"
                    },
                    {
                      price: "$87,000,000",
                      image: "https://cdn.photos.sparkplatform.com/pbb/20250213174733506224000000-o.jpg",
                      address: "1160 S Ocean Boulevard",
                      city: "Manalapan",
                      state: "Florida",
                      beds: "8",
                      baths: "15",
                      sqft: "27,745",
                      acres: "1.71",
                      link: "http://mlspalmbeach.lindaolsson.com/idx/details/listing/b294/25-291/1160-S-Ocean-Boulevard-Manalapan-33462"
                    },
                    // ... add more properties here
                  ].map((property, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="border-0 shadow-none">
                        <CardContent className="p-0">
                          <Link href={property.link} className="group cursor-pointer">
                            <div className="relative aspect-[4/3] overflow-hidden mb-5">
                              <img
                                src={property.image}
                                alt={`${property.address}, ${property.city}`}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute top-5 left-5 bg-white px-5 py-2 text-base">For Sale</div>
                            </div>
                            <div className="p-5">
                              <h3 className="text-3xl font-light mb-3">{property.price}</h3>
                              <div className="flex items-center gap-2 text-gray-600 mb-3">
                                <MapPin className="h-5 w-5" />
                                <span className="text-lg">{`${property.city}, ${property.state}`}</span>
                              </div>
                              <p className="text-gray-600 text-lg">
                                {`${property.beds} Beds | ${property.baths} Baths | ${property.sqft} Sq Ft`}
                                {property.acres && ` | ${property.acres} Acres`}
                              </p>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
              <div className="text-center mt-16">
                <Button variant="outline" className="gap-2 text-lg px-8 py-6 bg-green-900 text-white">
                  View All Properties
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>

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
          <section className="py-32 bg-[#1b4e1f] text-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div>
                  <h2 className="text-5xl font-light mb-10">Schedule a Consultation</h2>
                  <p className="text-gray-400 mb-10 text-xl">
                    Let's discuss your real estate goals. Whether you're looking to buy, sell, or learn more about the
                    Palm Beach market, we're here to help.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-5">
                      <Phone className="h-8 w-8" />
                      <div>
                        <p className="font-light text-lg">Call Us</p>
                        <p className="text-xl">(561) 820-9195</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <Mail className="h-8 w-8" />
                      <div>
                        <p className="font-light text-lg">Email Us</p>
                        <p className="text-xl">contact@lindaolsson.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <Calendar className="h-8 w-8" />
                      <div>
                        <p className="font-light text-lg">Office Hours</p>
                        <p className="text-xl">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-10 rounded-xl">
                  <form className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full p-4 text-lg border border-gray-200 focus:outline-none focus:border-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full p-4 text-lg border border-gray-200 focus:outline-none focus:border-gray-400"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-4 text-lg border border-gray-200 focus:outline-none focus:border-gray-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full p-4 text-lg border border-gray-200 focus:outline-none focus:border-gray-400"
                    />
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full p-4 text-lg border border-gray-200 focus:outline-none focus:border-gray-400"
                    />
                    <Button className="w-full bg-black text-white hover:bg-black/90 text-xl py-6">Send Message</Button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-black text-white py-16 bg-[#012a12] border-white/10">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                  <h3 className="text-2xl font-light mb-5">Linda R. Olson</h3>
                  <p className="text-gray-400 text-lg">Luxury Real Estate in Palm Beach and Beyond</p>
                </div>
                <div>
                  <h4 className="text-xl font-light mb-5">Quick Links</h4>
                  <ul className="space-y-3 text-gray-400 text-lg">
                    <li>
                      <Link href="#">Properties</Link>
                    </li>
                    <li>
                      <Link href="#">About Us</Link>
                    </li>
                    <li>
                      <Link href="#">Services</Link>
                    </li>
                    <li>
                      <Link href="#">Contact</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-light mb-5">Areas We Serve</h4>
                  <ul className="space-y-3 text-gray-400 text-lg">
                    <li>
                      <Link href="#">Palm Beach</Link>
                    </li>
                    <li>
                      <Link href="#">Jupiter</Link>
                    </li>
                    <li>
                      <Link href="#">West Palm Beach</Link>
                    </li>
                    <li>
                      <Link href="#">Palm Beach Gardens</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-light mb-5">Contact Us</h4>
                  <ul className="space-y-3 text-gray-400 text-lg">
                    <li>(561) 820-9195</li>
                    <li>linda@lindaolsson.com</li>
                    <li>101 Bradley Place</li>
                    <li>Palm Beach, FL 33480</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-white/10 mt-16 pt-10 text-center text-gray-400 text-lg">
                <p>© 2024 Linda R. Olson. All rights reserved.</p>
              </div>
            </div>
          </footer>
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

