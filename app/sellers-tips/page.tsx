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

export default function SellersTipsPage() {
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
                Sellers Tips
              </h1>

              <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                  <img
                    src="/sellertips.jpg"
                    alt="Palm Beach Luxury Home"
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                </div>

                <h2 className={`text-3xl font-semibold mb-8 text-[#1b4e1f]`}>
                  TOP TEN QUESTIONS EVERY SELLER SHOULD ASK THEIR REALTOR, and might not know to ask.
                </h2>

                <div className="space-y-12">
                  {/* Question 1 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      1. Will my property be marketed on the internet? Which websites will the property be showcased on? Do you have a website and what info can I find there?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      According to a recent estimate, 87% of real estate buyers use the internet to start their home search. Any good Realtor should have a well designed website that will feature your home as a listing. They should also syndicate that listing out to popular internet real estate sites like <Link href="https://www.trulia.com" className="text-[#1b4e1f] underline hover:no-underline">Trulia.com</Link>, <Link href="https://www.realtor.com" className="text-[#1b4e1f] underline hover:no-underline">Realtor.com</Link>, <Link href="https://www.luxuryrealestate.com" className="text-[#1b4e1f] underline hover:no-underline">www.luxuryrealestate.com</Link>, etc. This ensures maximum exposure for your property.
                    </p>
                  </div>

                  {/* Question 2 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      2. How do you plan to market my house?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      The Realtor should be able to give you a marketing plan that discusses the use of both internet and print. Print media could include brochures or magazine and newspaper advertising. In high end markets with unique properties, like Palm Beach, it is often important to advertise in national and international publications like The Robb Report or Avenue Magazine in New York City. We realize that a great deal of home buyers in Palm Beach come from other communities and tailor the marketing efforts to meet the needs of your property.
                    </p>
                  </div>

                  {/* Question 3 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      3. Will you, as my Realtor, create a virtual tour of my property?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      The Realtor should create a video slide show of your property that will show off the best details of your home and property. The virtual tour should be placed on YouTube.com, Realtor.com, the Multiple Listing Services, and other sites that will accept virtual tours for worldwide buyers to preview your property online. Potential buyers can familiarize themselves with your home, 24 hours a day, without the time, cost and inconvenience of traveling, thereby your potential market.
                    </p>
                    <p className="text-gray-700 text-lg italic mt-4">
                      "…of survey respondents who used the Internet in their home search, 47% said virtual tours were very important to a listing. Statistics from REALTOR.COM show that listings with virtual tours get clicked on 40% more than listings without virtual tours." — Susan Barber in the Business Development section of RISMedia's Real Estate magazine
                    </p>
                  </div>

                  {/* Question 4 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      4. Will you place a sign on the property and will you be having open houses?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      Your Realtor should sign place a sign on your property immediately, unless the seller prefers otherwise. They should schedule a "broker's open house" as soon as possible. It is important to have the other local sales agents preview new listings to make them aware of the property in order for them to contact their potential buyers. Regarding regular open houses, this is a topic for discussion. Many buyers do not prefer to have "lookers" who are potentially not qualified buyers previewing their properties, and therefore, do not wish to have open houses. This is determined on a case-to-case basis.
                    </p>
                  </div>

                  {/* Question 5 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      5. Will you be personally showing my home or will it be on a "lock box"?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      We do not use lock boxes. I believe that a Realtor should personally show your listing so that they can prepare the house for the showing by opening the blinds, putting on lights, and/or opening french doors to patios, etc... Also, this gives the opportunity to point out all the interesting features of the property and answer all questions the potential buyer asks at the showing. The Realtor should follow up with by contacting each buyer or buyer's agent and obtaining feedback from each showing to share with the property owner.
                    </p>
                  </div>

                  {/* Question 6 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      6. Is there anything I should be doing to improve my property prior to listing it?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      The house should be clean and free from odors. Clean up all closets and garage/storage spaces–make everything tidy. Repair anything that would come up on an inspection report. All buyers have inspections, and therefore, you may want to have one done prior to listing so that you may repair the items to prevent them from becoming a stumbling block. Touch up paint, repair any rotten wood, and pressure clean patio/pool areas.
                    </p>
                  </div>

                  {/* Question 7 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      7. When my property is sold, what can I expect my closing costs to be?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      The Realtor should provide you with the costs you can expect based on an estimated sales price. In the County of Palm Beach, the Seller typically pays the following: broker's commission, State documentary stamps, title commitment, prorated real estate taxes. If you have a loan or any liens on the property, those would also be deducted from the proceeds of the sale.
                    </p>
                  </div>

                  {/* Question 8 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      8. How long has your firm been in business?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      Check that the real estate agent currently has a license in good standing and ask him about his/her professional experience. Look for a real estate agent who has been in the business for at least five years as experience is one of the critical factors in choosing an agent. Ask him or her about their work schedule and how they want to be contacted. Ideally, your agent is a full-time realtor who is easily accessible by email, cell phone, and in person.
                    </p>
                  </div>

                  {/* Question 9 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      9. How many other properties are for sale in my neighborhood or in my building?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      When you meet with the Realtor they should provide a Comparative Market Analysis(CMA) which will contain all current listings and recent sales. This will help you determine the proper asking price, based on your desired time frames and individual circumstances. In today's market a proper pricing strategy is more important than ever.
                    </p>
                  </div>

                  {/* Question 10 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      10. How many homes have you sold in my area?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      A great way to find a listing agent is to identify agents who have sold homes in the last six to twelve months in your specific neighborhood. Agents that are consistently selling homes in your market area will have a better handle on how and why buyers prefer living in your community. The ability to market these positives can be a huge plus when trying to locate a buyer for your home.
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
      </div>
    </>
  )
} 