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
                      According to a recent estimate, 87% of real estate buyers use the internet to start their home search. Any good Realtor should have a well designed website that will feature your home as a listing...Our website, Linda Olsson.com is Unrivaled. Your property listing would be syndicated out to over 300 real estate websites, including Realtor.com, Zillow, Homess.com and other popular internet real estate sites. In addition, our firm is a member of the exclusive Palm Beach Board of Realtors Multiple Listing service "MLS" and Beaches Regional "MLS", which member realtors acess from Miami Beach to Martin County. This ensures maximum exposure for your property.
                    </p>
                  </div>

                  {/* Question 2 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      2. How do you plan to market my house?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      Your Realtor should be able to discuss with you their marketing plan for your property regarding their use of both internet, print, and social media, such as Instagram, Linked-in, and Facebook. Print media could include mail out flyers about the property, such as "Just Listed" postcards, as well as local newspaper advertising. In Florida, and particularly high-end markets markets like Palm Beach and the surrounding area, we realize that a great deal of the home buyers come from other parts of the country as people are fleeing high-tax states such as California, New York, Connecticut, Illinois, and the North East to take advantage of Florida's tax benefits. We tailor the marketing efforts to meet the needs of your property, in our efforts to attract buyers from the U.S. and across the Globe.
                    </p>
                  </div>

                  {/* Question 3 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      3. Will you, as my Realtor, create a virtual tour of my property?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      Your Realtor should create a video slideshow of your property that will show off the best details of your home and property to be placed on the Multiple Listing Service and other sites. The MLS listing would include the virtual tour, which would be available on over 300 websites including, but not limited to Realtor.com, Zillow, Homes.com, and the Multiple Listing Services that will accept virtual tours for worldwide buyers to preview your property online. Potential buyers can familiarize themselves with your home, 24 hours a day, without the time, cost and inconvenience of traveling, thereby your potential market.
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
                      With your permission, your Realtor should place a sign on your property immediately, and they should schedule a "broker's open house" as soon as possible. It is important to have the other local sales agents preview new listings to make them aware of the property in order for them to contact their potential buyers. Regarding regular open houses, this is a topic for discussion. Many buyers do not prefer to have "lookers" who are potentially not qualified buyers previewing their properties, and therefore, do not wish to have open houses. This is determined on a case-to-case basis.
                    </p>
                  </div>

                  {/* Question 5 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      5. Will you be personally showing my home or will it be on a "lock box"?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      We do not use lock boxes. I believe that a Realtor should personally show your listing so that they can prepare the house for the showing by opening the blinds, putting on lights, and/or opening french doors to patios, etc... Also, this gives the opportunity to point out all the interesting features of the property and answer all questions the potential buyer asks at the showing. The Realtor should follow up by contacting each buyer or buyer's agent and obtaining feedback from each showing to share with the property owner.
                    </p>
                  </div>

                  {/* Question 6 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      6. Is there anything I should be doing to improve my property prior to listing it?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      The house should be clean and free from odors. Clean up all closets and garage/storage spaces–make everything tidy. Repair anything that would come up on an inspection report. All buyers have inspections, and therefore, you may want to have one done prior to listing so that you may repair the items to prevent them from becoming a stumbling block. Touch up paint, repair any rotten wood, and pressure clean patio/pool areas. You should complete a seller's disclosure statement. If you have a survey, or elevation certificate or any documents that pertain to your property, they should be shared with your Realtor. Condominium managers will be contacted by your agent to obtain all the necessary items pertaining to the Financial Statements, Condominium Rules and Regulations, Budget, Condominium Documents, Assessments, Board Minutes, etc...The Buyer require these things when a contract is submitted and a Condominium Rider is executed and attached to the Contract.
                    </p>
                  </div>

                  {/* Question 7 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      7. When my property is sold, what can I expect my closing costs to be?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      Your Realtor should provide you with the closing costs you can expect based on an estimated sales price. In the County of Palm Beach, the Seller typically pays the following: broker's commission, State documentary stamps, title commitment, prorated real estate taxes. If you have a loan or any liens on the property, those would also be deducted from the proceeds of the sale. Seller's should have a licensed Florida Real Estate attorney to close their transaction...You should be represented, and your closing attorney will provide to you an "estimated list of costs due from you as The Seller". Our firm requires a legal representative, rather than a Title Company to close, as it is in your best interests to have representation at closing.
                    </p>
                  </div>

                  {/* Question 8 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      8. How long has your firm been in business?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      Specializing in Palm Beach Luxury Real Estate for over 35 years, we represent you with professionalism, and have a reputation you can trust. Thanks to superior customer service, in-depth knowledge of the market, and expert negotiation skills, we are nationally recognized as one of the top "10" agents in Palm Beach by the Wall Street Journal/Real Trends. We are available 24/7 Should you be checking out other firms, it is imperative that you check that the real estate agent currently has a license in good standing and ask him about his/her professional experience. Look for a real estate agent who has been in the business for at least five years as experience is one of the critical factors in choosing an agent. Ask him or her about their work schedule and how they want to be contacted. Ideally, your agent is a full-time realtor who is easily accessible by email, cell phone, and in person.
                    </p>
                  </div>

                  {/* Question 9 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      9. How many other properties are for sale in my neighborhood or in my building?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      When you contact our firm or any other Realtor, to discuss listing your property the Realtor will be pleased to email to you all the current listings as shown in the Multiple Listing Service "MLS" as well as the recent sales that are relevant to your property. This will help you determine the proper asking price, based on your desired time frames and individual circumstances. In today's market a proper pricing strategy is more important than ever.
                    </p>
                  </div>

                  {/* Question 10 */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      10. How many homes have you sold in my area?
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      Specializing in Palm Beach Luxury Properties from Pieds-A' terres to Oceanfront Estates, we sell a wide variety of homes in various price ranges in Palm Beach and the surrounding areas. Agents that are consistently selling homes in your market area have the knowledge, and local expertise to inform buyers and sellers on how and why buyers prefer living in Palm Beach or if another area, such as a golf course community would be best suited for your particular lifestyle and needs. Having the ability and expertise to market these positives for your particular property will be an advantage to you when trying to locate a buyer for your home. Thinking about Selling your home? Contact us to discuss your needs, neighborhood, and our expertise in your market...We get Results!
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