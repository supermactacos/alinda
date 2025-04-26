"use client";

import { Instrument_Serif } from "next/font/google"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
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

export default function MarketReportsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  type ReportItem = {
    type: 'year' | 'report';
    value: string;
  };

  // Group reports by year
  const reportsByYear = {
    "2024": [
      "4th Quarter Report 2024",
      "3rd Quarter Report 2024",
      "2nd Quarter Report 2024",
      "1st Quarter Report 2024"
    ],
    "2023": [
      "4th Quarter Report 2023",
      "3rd Quarter Report 2023",
      "2nd Quarter Report 2023",
      "1st Quarter Report 2023"
    ],
    "2022": [
      "4th Quarter Report 2022",
      "3rd Quarter Report 2022",
      "2nd Quarter Report 2022",
      "1st Quarter Report 2022"
    ],
    "2021": [
      "4th Quarter Report 2021",
      "3rd Quarter Report 2021",
      "2nd Quarter Report 2021",
      "1st Quarter Report 2021"
    ],
    "2020": [
      "4th Quarter Report 2020",
      "3rd Quarter Report 2020",
      "2nd Quarter Report 2020",
      "1st Quarter Report 2020"
    ],
    "2019": [
      "4th Quarter Report 2019",
      "3rd Quarter Report 2019",
      "2nd Quarter Report 2019",
      "1st Quarter Report 2019"
    ],
    "2018": [
      "4th Quarter Report 2018",
      "3rd Quarter Report 2018",
      "2nd Quarter Report 2018",
      "1st Quarter Report 2018"
    ],
    "2017": [
      "4th Quarter Report 2017",
      "3rd Quarter Report 2017",
      "2nd Quarter Report 2017",
      "1st Quarter Report 2017"
    ],
    "2016": [
      "4th Quarter Report 2016",
      "3rd Quarter Report 2016",
      "2nd Quarter Report 2016",
      "1st Quarter Report 2016"
    ],
    "2015": [
      "4th Quarter Report 2015",
      "3rd Quarter Report 2015",
      "2nd Quarter Report 2015",
      "1st Quarter Report 2015"
    ],
    "2014": [
      "4th Quarter Report 2014",
      "3rd Quarter Report 2014",
      "2nd Quarter Report 2014",
      "1st Quarter Report 2014"
    ]
  };

  // Flatten the reports array while maintaining year grouping
  const reports: ReportItem[] = Object.entries(reportsByYear)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Sort years in descending order
    .flatMap(([year, yearReports]): ReportItem[] => [
      { type: 'year' as const, value: year },
      ...yearReports.map(report => ({ type: 'report' as const, value: report }))
    ]);

  const reportsPerPage = 4;
  const totalPages = Math.ceil(reports.filter(item => item.type === 'report').length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;

  // Get current page reports while preserving year headers
  const getCurrentPageItems = (): ReportItem[] => {
    const items: ReportItem[] = [];
    let currentYear: string | null = null;
    let reportCount = 0;

    for (const item of reports) {
      if (item.type === 'year') {
        if (reportCount >= startIndex && reportCount < endIndex) {
          currentYear = item.value;
          items.push(item);
        }
      } else {
        if (reportCount >= startIndex && reportCount < endIndex) {
          if (currentYear && !items.find(i => i.type === 'year' && i.value === currentYear)) {
            items.push({ type: 'year', value: currentYear });
          }
          items.push(item);
        }
        reportCount++;
      }
    }
    return items;
  };

  const currentItems = getCurrentPageItems();

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
        {/* Main Section */}
        <section className="pt-32 bg-white">
          <div className="container mx-auto px-4">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-16 text-center ${instrumentSerif.className}`}>
              Market Reports
            </h1>

            <div className="max-w-2xl mx-auto mb-16">
              {/* Video Section */}
              <div className="relative w-full aspect-video mb-12">
                <iframe
                  src="https://www.youtube.com/embed/JTgvs02yZEI"
                  title="Palm Beach Real Estate"
                  className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Description */}
              <div className="text-center mb-12">
                <h2 className={`text-3xl font-semibold mb-4 text-[#1b4e1f]`}>
                  Our goal is to keep you abreast of the Palm Beach real estate market.
                </h2>
                <p className="text-gray-800 text-xl leading-relaxed mb-4">
                  Stay ahead of the curve — follow our quarterly and annual Palm Beach Home & In-Town Condo Sales Market Reports.
                </p>
                <p className="text-gray-700 text-lg italic">
                  Click on the links below to view each quarter.
                </p>
              </div>

              {/* Reports Grid */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="space-y-4">
                  {currentItems.map((item, index) => (
                    item.type === 'year' ? (
                      <h3 key={index} className="text-2xl font-semibold text-[#1b4e1f] mt-6 first:mt-0">
                        {item.value}
                      </h3>
                    ) : (
                      <button
                        key={index}
                        className="w-full bg-[#1b4e1f] text-white py-3 px-4 rounded-lg hover:bg-[#143917] transition-colors duration-300 text-base font-medium flex items-center group relative"
                      >
                        <span className="flex-grow text-center">{item.value}</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform absolute right-4" />
                      </button>
                    )
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-8 gap-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 text-[#1b4e1f]" />
                  </button>
                  <span className="text-lg font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 text-[#1b4e1f]" />
                  </button>
                </div>
              </div>
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
  )
} 