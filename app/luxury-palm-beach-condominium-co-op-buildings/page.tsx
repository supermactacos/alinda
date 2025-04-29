"use client";

import { Instrument_Serif } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { Logo } from "../components/Logo"
import Link from "next/link"
import Image from "next/image"
import { ContactCard } from "@/app/components/ContactCard"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function LuxuryCondosPage() {
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
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1b4e1f] shadow-lg">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>
      
      <main className="relative min-h-screen w-full overflow-x-hidden pt-[120px]">
        <section className="pt-32 bg-white relative" style={{ zIndex: 30 }}>
          <div className="container mx-auto px-4">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
              Luxury Palm Beach Condominium and Co-Op Buildings
            </h1>

            <div className="max-w-4xl mx-auto mb-16">
              {/* Building Listings */}
              <div className="space-y-16">
                {/* Winthrop House */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    Winthrop House
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=100+Worth+Avenue,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      100 Worth Avenue, Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury1.jpg"
                      alt="Winthrop House"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Situated on World Renown Worth Avenue and South Ocean Blvd., this oceanfront condominium building designed by Mike Burrows in 1970 has 121 units on 8 floors. Lovely warm wood paneled lobby area and receiving entry hall, excellent well run building with a reputation for reserves and no assessments. Fabulous remodeled pool area on the third floor level and tunnel under South Ocean Boulevard with direct entrance to the beach. Wonderful exercise room, club house room for entertaining, and garage parking. Best location in town–walk to shops, restaurants, and the beach. Full time manager, doormen and excellent security, allows one small pet. Allows rentals 1x/2 years with restrictions.
                    </p>
                  </div>
                </div>

                {/* The Villas */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    The Villas
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=425+Worth+Avenue,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      425 Worth Avenue, Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury2.jpg"
                      alt="The Villas"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      The Villas is an exclusive co-operative building that was completed in 1971. Located at the west end of Worth Avenue across the street from the Everglades Club, the building has six floors and only twenty-seven units. It's unique location provides easy access to all the shops and restaurants, as well as a lovely view of the Intracoastal waterway and Everglades Island from each of the units and penthouses. There are two and three bedroom units and three penthouses most of which have an additional staff bedroom and bath. This full service prestigious co-op with a stunning lobby re imagined by the world-famous designer, Scott Snyder, provides top notch services with full-time manager, doormen, garage parking, and allows one pet up to 20 pounds. There are no rentals allowed. Application and interview are a requirement of this exclusive building.
                    </p>
                  </div>
                </div>

                {/* 330 Building */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    330 Building
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=330+S.+Ocean+Blvd.,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      330 S. Ocean Blvd., Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury3.jpg"
                      alt="330 Building"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Exclusive full service condominium building on the ocean in the center of town. Built in 1979, with 29 units on 5 floors, this wonderful building offers many three bedroom units, which are difficult to find in Palm Beach. The three bedrooms are large at approximately 2,900 total sq. ft., the two bedrooms are approximately 2,100 total sq. ft. These condominium units have high ceilings and are in the perfect location across the street from the life-guarded town beach, within walking distance to restaurants, antique shops, Worth Avenue. Pets are allowed, doorman, exercise room, pool, garage. Allows rental 1x/year. Application and interview required.
                    </p>
                  </div>
                </div>

                {/* 400 Building */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    400 Building
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=400+S.+Ocean+Blvd.,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      400 S. Ocean Blvd., Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury4.jpg"
                      alt="400 Building"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Designed by Edward Durell Stone in 1965 this unique building is truly loved by its residents. These two bedroom two bath units of approximately 1,500 sq. feet are duplexes on two floors most units have lovely ocean views. Originally built as 60 units on 6 floors, however, many of the units have been combined over the years to create 4 bedroom 4.5 bath duplex apartments of approximately 3,000 sq. feet. Wonderful open atrium entryway with fountains and open terrace walkways, there are no interior hallways from unit to unit. A fabulous roof-top pool provides wonderful ocean breezes and gorgeous ocean views. A club room on the pool level is perfect for parties. Allows two pets (dogs/cats) with no weight restrictions, manager, doorman, exercise room, garage. Allows rental 1x/year with restrictions. Application and interview required.
                    </p>
                  </div>
                </div>

                {/* One Royal Palm */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    One Royal Palm
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=100+Royal+Palm+Way,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      100 Royal Palm Way, Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury5.jpg"
                      alt="One Royal Palm"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Designed by Howard Chilton this elegant, Park-Avenue style white glove condominium building situated on the corner of Royal Palm Way and South Ocean Blvd. has 39 units on 6 floors and was built in 1969. This exclusive building offers floor to ceiling windows, terraces, and fabulous ocean views. Two and three bedroom units, and occasionally a wonderful Penthouse is available. This full service building with manager, 24 hour door man, pool and gym does not allow rentals. One small pet is permitted with restrictions. Application and Interview required.
                    </p>
                  </div>
                </div>

                {/* Sun & Surf */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    Sun & Surf
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=100+&+130+Sunrise+Avenue,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      100 & 130 Sunrise Avenue, Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury6.jpg"
                      alt="Sun & Surf"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      One of the only Direct Oceanfront Full service buildings In-town. Designed by Eugene Lawrence in 1966...totally renovated in 2017/2018. Sun and Surf is one of only two buildings situated directly on the beach, two buildings with a total of 136 units on 7 floors. This complex is unique in that is truly full service, like living at a fine hotel. Two pools, with cabanas available for purchase, towel service, pool attendants, full time manager, valet parking, garage, 24 hour doorman. The direct oceanfront building at 100 Sunrise does not allow pets, however the 130 Building does allow one small pet with restrictions. Allows rentals 1x/3 years with restrictions. Application and interview required.
                    </p>
                  </div>
                </div>

                {/* Il Lugano */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    Il Lugano
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=300+Seminole+Avenue,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      300 Seminole Avenue, Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury7.jpg"
                      alt="Il Lugano"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Exclusive, top security building, situated directly on the intracoastal waterway built in 2002 consisting of two buildings with 6 floors and various units of 3 to 5 bedrooms. One of the most exclusive buildings in Palm Beach, this full-service building features voluminous ceiling heights, fabulous city and water views, direct intracoastal pool, 24 hour door man, wine room, fitness center...true luxury for the discerning buyer. No rentals or pets. Application and interview required.
                    </p>
                  </div>
                </div>

                {/* Leverett House */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    Leverett House
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=110+and+120+Sunset+Avenue,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      110 and 120 Sunset Avenue, Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury8.jpg"
                      alt="Leverett House"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Exclusive direct oceanfront condominium building designed by Mike Burrows in 1983 consisting of two buildings with 21 units per building. One of the only direct oceanfront buildings in-town, this complex is situated in a quiet location with a wonderful pool, in a full service building with guard, 24 hour doorman, and garage. Units varying in size, location, and price range. Some offer magnificent direct oceanfront and others offer views of the Breakers golf course. Poolside cabanas are sometimes available for purchase. Allows one small pet with restrictions. Rentals are allowed with restrictions. Application and Interview required.
                    </p>
                  </div>
                </div>

                {/* L'Ermitage */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    L'Ermitage
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=200+Bradley+Place,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      200 Bradley Place, Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury9.jpg"
                      alt="L'Ermitage"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Exclusive and elegant direct Intracoastal building designed by Eugene Lawrence in 1985 consisting of 29 units on 5 floors. The complex has two swimming pools – one directly on the Intracoastal waterway, a fitness center, tennis court, and garage. This full service building with doorman does not allow pets or rentals. Not often available, the units in this building range in square footage from 2,325 to 3,768. Prices range depending upon location and view. Application and interview required.
                    </p>
                  </div>
                </div>

                {/* Dunster House */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    Dunster House
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=360+South+Ocean+Blvd.,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      360 South Ocean Blvd., Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Prestigious condominium building designed by Mike Burrows built in 1978 across from the ocean in the center of town just north of Worth Avenue. This exclusive building has only 15 units on 6 floors providing privacy for the discerning buyer. Most units have outstanding ocean views and/or town views, and square footage is approximately 2,500 total sq.ft.. Many units were originally 3 bedrooms, but may have been converted. Full service building with doorman, exercise room, pool, garage. Does not allow rentals. Pets allowed 25 lbs or under. Application and interview required.
                    </p>
                    <p className="font-bold">PHOTO COMING SOON!</p>
                  </div>
                </div>

                {/* Lowell House */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    Lowell House
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=340+South+Ocean+Blvd.,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      340 South Ocean Blvd., Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury10.jpg"
                      alt="Lowell House"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Designed by Mike Burrows in 1975 this elegant building has 29 units on 6 floors. Direct ocean views are outstanding. Two bedroom, two bath units with high ceilings and occasionally Penthouses with large terraces suitable for entertaining are available. Excellent location in the center of town, walk to fine restaurants, Cafe L'Europe, antique shops, Worth Avenue and directly across from the life guarded public beach. Full service, manager, doorman, club house, pool, and garage. Allows rentals and pets with restrictions. Application and Interview required.
                    </p>
                  </div>
                </div>

                {/* The Bellaria */}
                <div className="building-listing">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    The Bellaria
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=3000+South+Ocean+Blvd.,+Palm+Beach,+FL+33480" target="_blank" className="text-[#1b4e1f] hover:underline">
                      3000 South Ocean Blvd., Palm Beach, FL 33480
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury11.jpg"
                      alt="The Bellaria"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Designed by Eugene Lawrence in 2006, this 6 floor, 36 unit direct oceanfront exclusive condominium building with outstanding ocean and intracoastal views is comprised of two buildings connected by a unique interior common lobby decorated by a nationally renowned designer affording access to the pool, ocean, and a view of the lovely gardens. Full service building with concierge, manager, doorman, 24 hour manned gatehouse, and garage parking. Allows one pet with restrictions. Application and Interview required.
                    </p>
                    <h3 className="text-xl font-semibold mt-6 mb-4">Building Amenities:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Expansive multi level pool and recreation deck complete with tropical landscaping and fountains</li>
                      <li>Two tennis courts</li>
                      <li>Undercover bicycle storage</li>
                      <li>Heated Olympic length pool</li>
                      <li>Heated children's pool</li>
                      <li>Heated spa</li>
                      <li>Men's & Women's spas with sauna and steamrooms</li>
                      <li>State-of-the-art fitness center</li>
                      <li>Billiards room</li>
                      <li>Media room with twelve seats to experience a state-of-the-art audio/visual entertainment system</li>
                      <li>Spacious party room overlooking the pool deck giving the ambience of indoor and outdoor entertaining areas</li>
                      <li>Fully equipped catering kitchen adjacent to party room</li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* West Palm Beach Section */}
              <div className="mt-20">
                <h2 className={`text-5xl md:text-6xl text-center font-light mb-12 ${instrumentSerif.className}`}>
                  Luxury Waterfront Buildings - Flagler Drive, West Palm Beach
                </h2>
                
                {/* The Plaza */}
                <div className="building-listing mt-16">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    The Plaza
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=525+and+529+South+Flagler+Drive,+West+Palm+Beach,+FL+33401" target="_blank" className="text-[#1b4e1f] hover:underline">
                      525 and 529 South Flagler Drive, West Palm Beach, FL 33401
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury11.jpg"
                      alt="The Plaza"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Everyone loves Trump Plaza with its fabulous location on the Intracoastal, magnificent ocean, Intracoastal and Palm Beach views. Built in 1985, this two building, full service complex has a grand gated, guarded entry. With a total of 221 two and three bedroom units, some double units, Penthouses, and Grand Penthouses each building has 33 floors with two elevator banks per building with each elevator servicing two apartments per floor. Trump Plaza is known for its high end services including: valet, security, management and doormen. The two buildings are joined together by a grand common lobby area with voluminous ceilings. Other building amenities include: two outdoor pools–the east pool overlooking the Intracoastal, and the west pool overlooking the tennis courts, outstanding fitness center, club room, conference room, and garage. Allows pets with restrictions. Allows rentals with restrictions –1x/year 3 month minimum. Application and Interview required.
                    </p>
                  </div>
                </div>

                {/* One Watermark */}
                <div className="building-listing mt-16">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    One Watermark
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=622+N.+Flagler+Drive,+West+Palm+Beach,+FL+33401" target="_blank" className="text-[#1b4e1f] hover:underline">
                      622 N. Flagler Drive, West Palm Beach, FL 33401
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury12.jpg"
                      alt="One Watermark"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      One Watermark, surrounded by the Intracoastal Waterway and overlooking the glorious Atlantic Ocean, these spacious residence with huge terraces and private balconies provide glorious views of the intracoastal, ocean, and Palm Beach. Built by WCI in 2002, there are four available luxury tower estate floor plans range from 4,035 to 5,650 air-conditioned square feet and include private elevator, fireplace, large terraces, spacious bedroom suites and bathrooms, wardrobe areas, gourmet kitchen, custom cabinetry, built-in cappuccino maker and a wine cooler. The Four lavish penthouse residences range from 7,649 to 9,061 under a/c square footage. One Watermark is a concierge building with only 48 residences. The building is truly one of elegance and taste with it's lobby and common areas being totally updated in 2018, hurricane impact windows, generator, conference/board room, fabulous exercise facility, separate guest quarters, movie theater, and valet service. Application and interview required.
                    </p>
                  </div>
                </div>

                {/* The Bristol */}
                <div className="building-listing mt-16">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    The Bristol
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=1100+S.+Flagler+Drive,+West+Palm+Beach,+FL+33401" target="_blank" className="text-[#1b4e1f] hover:underline">
                      1100 S. Flagler Drive, West Palm Beach, FL 33401
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury13.jpg"
                      alt="The Bristol"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      The Bristol Palm Beach is truly luxury waterfront living in West Palm Beach. Panoramic unobstructed views of the intracoastal, ocean, and Palm Beach...are only the beginning of the newest condominium residence situated on Flagler Drive. With its five star resort amenities, this iconic twenty-five story waterfront condominium provides the opportunity to purchase 3 to 5 bedroom condominium units ranging from 3,700 to 9,000 square feet along with high efficiency and noise reducing laminated-insulated floor to ceiling exterior glass, back-up generator, state-of-the art technology with ultra high speed connectivity, private guest suites available or purchase. With truly unique finishes made to your taste, The Bristol Palm Beach will set the bar for Palm Beach living.
                    </p>
                  </div>
                </div>

                {/* Waterview Towers */}
                <div className="building-listing mt-16">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    Waterview Towers
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=400+North+Flagler+Drive,+West+Palm+Beach,+FL+33401" target="_blank" className="text-[#1b4e1f] hover:underline">
                      400 North Flagler Drive, West Palm Beach, FL 33401
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury14.jpg"
                      alt="Waterview Towers"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Direct Intracoastal condominium building built in 1981 with magnificent views of yachts, Intracoastal, Palm Beach, and the Breakers consisting of 132 units on 27 floors. This building is a Palm Beach favorite with its convenient location just across the bridge. Four banks of elevators service this building with two apartments per floor. Full service building with valet, manager, garage parking, doorman, pool, exercise room, and tennis court. Owners are allowed one pet with restrictions. Allows rentals 1x/year with restrictions. Building is on a land-lease. Application and Interview required.
                    </p>
                  </div>
                </div>

                {/* Esplanade Grande */}
                <div className="building-listing mt-16">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    Esplanade Grande
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=201+Narcissus+Avenue,+West+Palm+Beach,+FL+33401" target="_blank" className="text-[#1b4e1f] hover:underline">
                      201 Narcissus Avenue, West Palm Beach, FL 33401
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury15.jpg"
                      alt="Esplanade Grande"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Exceptional Intracoastal condominium designed by Sieger Suarez Architectural partnership in 2004 consists of 62 units on 16 floors, some units have been combined to create double units. Its superb location provides access to the heart of West Palm Beach where the residents enjoy walking on the Intracoastal waterway board walk, fine dining, shopping, and night life. The units offer spectacular water and Palm Beach views, featuring: 10 to 14 foot ceilings, gourmet kitchens with European cabinets, stainless steel appliances, and granite counter tops. Building amenities include: Concierge service, rooftop pool and gardens, entertainment/conference room, valet parking, garage, doorman and security. Pets allowed with restrictions. Allows rentals no less than 180 days, 2x/year with restrictions. Application and interview required.
                    </p>
                  </div>
                </div>

                {/* Trianon */}
                <div className="building-listing mt-16">
                  <h2 className="text-3xl font-semibold text-[#1b4e1f] mb-4">
                    Trianon
                  </h2>
                  <p className="text-xl mb-2">
                    <Link href="https://maps.google.com/?q=1200+S.+Flagler+Drive,+West+Palm+Beach,+FL+33401" target="_blank" className="text-[#1b4e1f] hover:underline">
                      1200 S. Flagler Drive, West Palm Beach, FL 33401
                    </Link>
                  </p>
                  <div className="relative w-full aspect-[16/9] mb-6">
                    <Image
                      src="/luxury16.jpg"
                      alt="Trianon"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>
                      Trianon, built in 1984 is a full service building with 24 hour doorman, valet, manager, and security. This 29 floor building has 96 units with two elevators servicing two units per floor. The building has a lovely pool, exercise room, and garage. Allows pets with restrictions. Allows rentals with restrictions. Application and interview required.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Contact Card Section */}
        <ContactCard className="relative" style={{ zIndex: 30 }} />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
} 