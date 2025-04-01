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

export default function CommunityPage() {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(contentTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          {/* Community Section */}
          <section className="pt-32 bg-white">
            <div className="container mx-auto px-4">
              <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
                Community Involvement
              </h1>
              <div className="max-w-4xl mx-auto">
                <h2 className={`text-2xl font-semibold mb-6 text-[#1b4e1f] text-center`}>
                  LEADERSHIP BEGINS WITH OUR CITIZENS...We are committed to giving back to our community!
                </h2>
                <p className="text-gray-800 text-xl leading-relaxed mb-6">
                  Linda Olsson's career in real estate began in Palm Beach when she opened her office in 1989, she fell in love with the real estate profession and the Town of Palm Beach. A Palm Beach resident since 1998, born and raised in Boston, she began her career as a paralegal in Boston, and thereafter in Palm Beach. Linda is committed to the town, she is a community leader, who is committed to giving back to the community, and hopes that her commitment to the Town and its wonderful residents will make a difference.
                </p>
                <p className="text-gray-800 text-xl leading-relaxed mb-6">
                  Linda has always been an active member of the Palm Beach community, she has been a member of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach Civic Association</Link> for 29 years, before becoming a Director and a member of the exclusive Executive Committee, the Nominating Committee, the Beautification, and Public Safety Committee. As a resident in Palm Beach, she has been a 27-year member and Patron member of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach United Way</Link>, a member and corporate/Friend of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Society of The Four Arts</Link>, a Sponsor of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach Preservation Foundation</Link>, Patron of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Flagler Museum</Link>, Sustaining Patron of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Norton Museum of Art</Link>, and a supporter of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach Symphony</Link>.
                </p>
                <p className="text-gray-800 text-xl leading-relaxed mb-6">
                  A lover of all animals, Linda is a long-time supporter of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Peggy Adams Animal Rescue League</Link> in the exclusive Leadership Circle and she supports the Legacy Animal Christmas Ball.
                </p>
                <p className="text-gray-800 text-xl leading-relaxed mb-6">
                  Linda joined Audrey Gruss, founder, and Scott Snyder, Chairman, on their committee for the Inaugural Palm Beach 5K Race of Hope to Defeat Depression. She is a founding member of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach/Flagler Rotary Club</Link>, where she was club secretary and received a Paul Harris Fellow award.
                </p>
                <p className="text-gray-800 text-xl leading-relaxed mb-6">
                  Linda is also a member of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach Chamber of Commerce</Link>, she is a trustee/supporter of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Flagler Museum</Link>, a member of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Norton Museum of Art</Link> the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach Daughter of the American Revolution (DAR)</Link> and is a sustaining member of {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Junior League of the Palm Beaches</Link>, and a Key Club Member of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Norton Sculpture Gardens</Link>, and has served on the Business and Professional Campaign Committee of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach United Way</Link>.
                </p>
                <p className="text-gray-800 text-xl leading-relaxed mb-8">
                  Professionally Linda served as a Director of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach Board of Realtors</Link> from 1995 to 1997. She has been a member of the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Palm Beach Board of Realtors</Link> and the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Regional Board of Realtors</Link> since 1989 and is a Graduate of the Real Estate Institute (GRI). She is a member of the Palm Beach and Regional Multiple Listing Services, the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">National Association of Realtors</Link>, and the {" "}
                  <Link href="#" className="text-[#1b4e1f] underline hover:no-underline">Florida Association of Realtors</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Card Section */}
          <section className="pt-4 pb-24 bg-white">
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
                        <p><Link href="#" className="text-green-900  hover:underline">View Active Listings →</Link></p>
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