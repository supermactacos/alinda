"use client";

import { Instrument_Serif } from "next/font/google"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import Link from "next/link"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"
import { Footer } from "@/app/components/Footer"
import { Logo } from "@/app/components/Logo"
import { ContactCard } from "@/app/components/ContactCard"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function FloridaTaxBenefitsPage() {
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
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-light mb-16 text-center ${instrumentSerif.className}`}>
              Why Consider Relocating to Florida? <br />
              Tax Benefits & Wealth Preservation
            </h1>

            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <img
                  src="/tax.jpg"
                  alt="Palm Beach Aerial View"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>

              <h2 className={`text-3xl font-semibold mb-6 text-[#1b4e1f] ${instrumentSerif.className}`}>
                Palm Beach Real Estate <Link href="https://www.wilmingtontrust.com/library/article/why-consider-living-in-florida" target="_blank" className="text-[#1b4e1f] hover:underline">(A Guide To Preserving Wealth)</Link>
              </h2>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                Thinking about relocating to Florida to take advantage of Florida's tax benefits? Florida has no state income tax, which means Social Security retirement benefits, pension income and income from an IRA or a 401(k) are all untaxed. Florida has no estate or inheritance tax. Property and sales tax rates are close to the national averages. Palm Beach Market Trend…according to the Palm Beach Daily News and The New York Times just about everyone living in the Northeast, Chicago, California and other high tax states is relocating to Palm Beach and Miami.
              </p>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                "Many millionaires are moving to Palm Beach, the home of Trump's Mar-a-Lago resort, to avoid an increase in taxes" – Reuters. According to Newsweek 11/2017, "The Republican tax plan has America's one percent worried about facing steeper levies on their income, and fat cats in the Northeast may have found a solution: Flee to Florida." "Fifty-One of the world's billionaires call Florida home, half of the top 10 billionaires in the State reside in Palm Beach"- Forbes' 2018 list.
              </p>

              <h2 className={`text-2xl font-semibold mb-6 text-[#1b4e1f]`}>
                Why High Net Worth Individuals Are Choosing Florida
              </h2>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                Why are high net worth individuals, like David Tepper, Ken Griffin, Paul Tudor Jones, Kenneth Tropin, Paul Edgerley along with many of your colleagues, friends and neighbors relocating to South Florida other than the fabulous weather? It's simple… Wealth Preservation. According to an April 30, 2016 article in the New York Times "One Top Taxpayer Moved, and New Jersey Shuddered" by Robert Frank (highlights below), New Jersey's wealthiest resident reportedly "shifted his personal and business domicile to Florida".
              </p>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                Hedge-fund billionaire David Tepper declared himself a resident of Florida after living for over 20 years in New Jersey. He later moved the official headquarters of his hedge fund, Appaloosa Management, to Miami. Several New Jersey lawmakers cited his relocation as proof that the state's tax rates, up from 6.37 percent in 1996, are chasing away the rich. Florida has no personal income tax or inheritance tax. "If you're making hundreds of millions of dollars and you're paying close to 10 percent to the state of New Jersey, you do the math," said Jon Bramnick, the Republican leader in the New Jersey Assembly. "You can save millions a year by moving to Florida. How can you blame him?"
              </p>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                In New York, California, Connecticut, Maryland and New Jersey the top 1 percent pay a third or more of total income taxes. Some academic research shows that high taxes are chasing the rich to lower-tax states, and anecdotes of tax-fleeing billionaires abound. Millionaires and billionaires who move from the high-tax states in the Northeast to Florida, for instance, may be drawn by the sunshine, lifestyle and retirement culture, in addition to lower taxes.
              </p>

              <h2 className={`text-2xl font-semibold mb-6 text-[#1b4e1f]`}>
                Our Connections & Resources For Your Relocation
              </h2>

              <p className="text-gray-800 text-xl leading-relaxed mb-8">
                Over the past 30 years we have many local connections to other professionals including, tax advisors, wealth management firms, local bankers, estate management firms, architects, contractors, painters, and others that we are delighted to share with you. As your real estate Professional, it is important to us that our customers have the information they require to make an informative decision as it relates to their real estate needs.
              </p>

              <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                <p className="text-gray-800 text-xl leading-relaxed mb-4">
                  We are delighted to share this informative brochure to you…Why Consider Florida? The Sunshine State offers a host of financial and tax benefits… Article provided by Wilmington Trust, NA. For further information, please contact:
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