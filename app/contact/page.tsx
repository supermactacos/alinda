"use client";

import { Instrument_Serif } from "next/font/google"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/app/components/Footer"
import { Logo } from "@/app/components/Logo"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useEffect, useState } from "react"

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("");

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
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1b4e1f] shadow-lg">
        <Navbar isScrolled={isScrolled} alwaysSolid />
      </div>
      
      <main className="relative min-h-screen w-full overflow-x-hidden pt-[120px]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-white">
          <div className="container mx-auto px-4">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-light mb-10 text-center ${instrumentSerif.className}`}>
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
              We would love to hear from you. Whether you're looking to buy, sell, or just have questions about Palm Beach real estate, our team is here to help.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-[#f8f8f8]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className={`text-4xl font-light mb-8 text-[#1b4e1f] ${instrumentSerif.className}`}>
                  Get in Touch
                </h2>
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
                <h2 className={`text-4xl font-light mb-8 text-[#1b4e1f] ${instrumentSerif.className}`}>
                  Send Us a Message
                </h2>
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

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-light mb-12 text-center text-[#1b4e1f] ${instrumentSerif.className}`}>
              Visit Our Office
            </h2>
            <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.5599058451694!2d-80.03733562405648!3d26.620826676504723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d8d6e9a046102f%3A0xe21ecd7e8655ec30!2s101%20Bradley%20Pl%2C%20Palm%20Beach%2C%20FL%2033480%2C%20USA!5e0!3m2!1sen!2sus!4v1689355460973!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
} 