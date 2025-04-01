"use client";

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function Navbar({ isScrolled, alwaysSolid = false }: { isScrolled: boolean; alwaysSolid?: boolean }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] w-full py-8 px-4 transition-all duration-300 ${
      isScrolled || alwaysSolid ? 'bg-[#1b4e1f]' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="relative group">
            <Link href="/about" className="flex items-center gap-1 text-white text-xl group-hover:text-white/90 transition-colors">
              About
              <ChevronDown className="h-4 w-4 mt-0.5 group-hover:rotate-180 transition-transform duration-200" />
            </Link>
            <div className="absolute top-full left-0 mt-2 w-[300px] bg-green-900 text-white border border-green-800 rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/our-team" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                OUR TEAM
              </Link>
              <Link href="/a-leader-in-palm-beach-real-estate" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                A LEADER IN PALM BEACH REAL ESTATE
              </Link>
              <Link href="/concierge-quality-realty-services" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                CONCIERGE QUALITY REALTY SERVICES
              </Link>
              <Link href="/community-involvement" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                GIVING BACK...COMMUNITY INVOLVEMENT
              </Link>
              <Link href="/palm-beach-florida-real-estate-news" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                IN THE NEWS
              </Link>
              <Link href="#" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                PRIVACY POLICY
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-1 text-white text-xl group-hover:text-white/90 transition-colors">
                Search For Homes
                <ChevronDown className="h-4 w-4 mt-0.5 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-[300px] bg-green-900 text-white border border-green-800 rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/north-end-palm-beach-real-estate" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                  NORTH END HOMES
                </Link>
                <Link href="/in-town-palm-beach-real-estate" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                  IN TOWN HOMES
                </Link>
                <Link href="/estate-section" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                  ESTATE SECTION HOMES
                </Link>
                <Link href="/in-town-townhomes" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                  IN-TOWN TOWNHOMES
                </Link>
                <Link href="/in-town-condos" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                  IN-TOWN CONDOS
                </Link>
                <Link href="/sloans-curve-south-to-manalapan" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                  SLOANS CURVE SOUTH TO MANALAPAN CONDOMINIUMS
                </Link>
                <Link href="/luxury-palm-beach-condominium-co-op-buildings" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                  LUXURY PALM BEACH CONDOMINIUM AND CO-OP BUILDINGS
                </Link>
                <Link href="#" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                  VIRTUAL TOURS
                </Link>
              </div>
            </div>
            <Link href="#" className="text-white text-xl">
              Blog
            </Link>
          </div>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <img src="/flogo.svg" alt="Logo" className="h-20 mr-10" />
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 text-white text-xl group-hover:text-white/90 transition-colors">
              Tax Benefits
              <ChevronDown className="h-4 w-4 mt-0.5 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-[300px] bg-green-900 text-white border border-green-800 rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/global-reach-local-expertise" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                GLOBAL REACH/LOCAL EXPERTISE
              </Link>
              <Link href="/palm-beach-a-slice-of-paradise" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                PALM BEACH – A SLICE OF PARADISE
              </Link>
              <Link href="/buying-selling-hire-professional" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                BUYING OR SELLING? HIRE A PROFESSIONAL!
              </Link>
              <Link href="/4-essential-things-to-consider-when-buying-a-condo" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                4 ESSENTIAL THINGS TO CONSIDER WHEN BUYING A CONDO
              </Link>
              <Link href="/sellers-tips" className="block text-lg py-3 px-4 hover:bg-green-800 transition-colors cursor-pointer">
                SELLERS TIPS
              </Link>
            </div>
          </div>
          <Link href="/market-reports" className="text-white text-xl">
            Market Reports
          </Link>
          <Link href="/testimonials" className="text-white hidden md:block text-xl">
            Testimonials
          </Link>
          <Link href="tel:(561) 313-6504" className="text-white text-xl">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
} 