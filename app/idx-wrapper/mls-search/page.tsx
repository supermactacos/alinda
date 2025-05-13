"use client";
// 
import Link from "next/link";
import Image from "next/image";
import Script from 'next/script';
import { ChevronDown, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState, useEffect } from "react";

// Create a special wrapper page optimized for IDX service
export default function MLSSearchPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Inline critical styles for proper IDX rendering
  const inlineStyles = `
    /* Base styles */
    body {
      font-family: serif;
      margin: 0;
      padding: 0;
    }
    
    /* Navigation styles */
    .navbar {
      background-color: #1b4e1f;
      color: white;
      padding: 20px 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
    
    .nav-logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .nav-links {
      display: flex;
      gap: 20px;
    }
    
    .nav-link {
      color: white;
      font-size: 18px;
      text-decoration: none;
    }
    
    /* IDX content container */
    .idx-container {
      padding-top: 180px; 
      padding-bottom: 60px;
      background-color: white;
    }
    
    .content-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    /* Footer styles */
    .footer {
      background-color: #1b4e1f;
      color: white;
      padding: 60px 0;
    }
    
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
    }
    
    .footer-heading {
      color: #fbcfe8;
      font-size: 22px;
      margin-bottom: 20px;
      font-weight: 300;
    }
    
    .footer-link {
      color: white;
      font-size: 18px;
      text-decoration: none;
      display: block;
      margin-bottom: 10px;
    }
    
    .footer-text {
      color: white;
      font-size: 18px;
      margin-bottom: 10px;
    }
    
    .social-icons {
      display: flex;
      gap: 15px;
      margin-top: 15px;
    }
    
    .copyright {
      text-align: center;
      padding-top: 30px;
      margin-top: 30px;
      border-top: 1px solid rgba(255,255,255,0.1);
      font-size: 18px;
    }
  `;

  return (
    <>
      {/* Inline styles for IDX integration */}
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      
      {/* Simplified Navbar with inline styles */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-links">
            <Link href="/about-us" className="nav-link">About</Link>
            <Link href="/properties" className="nav-link">Properties</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
          </div>
          
          <div className="nav-logo">
            <Link href="/">
              <img src="/flogo.svg" alt="Linda Olsson Realty" width={100} height={80} />
            </Link>
          </div>
          
          <div className="nav-links">
            <Link href="/market-reports" className="nav-link">Market Reports</Link>
            <Link href="/testimonials" className="nav-link">Testimonials</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>
      
      {/* IDX Content Area */}
      <main>
        <section className="idx-container">
          <div className="content-container">
            {/* IDX marker divs for content injection */}
            <div id="idxStart"></div>
            <div id="idx-results-wrapper" style={{ minHeight: "800px" }}></div>
            <div id="idxStop"></div>
          </div>
        </section>
        
        {/* IDX script */}
        <Script
          id="idxScript"
          src="//mlspalmbeach.lindaolsson.com/idx/customjs.php"
          strategy="afterInteractive"
        />
      </main>
      
      {/* Simplified Footer with inline styles */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-heading">Linda R. Olsson</h3>
              <p className="footer-text">Luxury Real Estate in Palm Beach and Beyond</p>
              <div className="social-icons">
                <a href="https://www.facebook.com/LindaOlssonRealtor" target="_blank" rel="noopener noreferrer">
                  <Facebook color="white" size={24} />
                </a>
                <a href="https://www.instagram.com/LindaOlssonPB/" target="_blank" rel="noopener noreferrer">
                  <Instagram color="white" size={24} />
                </a>
                <a href="https://www.linkedin.com/in/lindaolsson/" target="_blank" rel="noopener noreferrer">
                  <Linkedin color="white" size={24} />
                </a>
                <a href="https://x.com/RealtorPalmBch" target="_blank" rel="noopener noreferrer">
                  <Twitter color="white" size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="footer-heading">Quick Links</h4>
              <Link href="/about" className="footer-link">About</Link>
              <Link href="https://mlspalmbeach.lindaolsson.com/i/featured-properties" className="footer-link">Featured Properties</Link>
              <Link href="/blog" className="footer-link">Blog</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
            </div>
            
            <div>
              <h4 className="footer-heading">Search by Neighborhood</h4>
              <Link href="/north-end-palm-beach-real-estate" className="footer-link">North End Homes</Link>
              <Link href="/in-town-palm-beach-real-estate" className="footer-link">In Town Homes</Link>
              <Link href="/estate-section" className="footer-link">Estate Section Homes</Link>
              <Link href="/in-town-condos" className="footer-link">In Town Condominiums</Link>
            </div>
            
            <div>
              <h4 className="footer-heading">Contact Us</h4>
              <p className="footer-text">(561) 820-9195</p>
              <p className="footer-text">linda@lindaolsson.com</p>
              <p className="footer-text">101 Bradley Place</p>
              <p className="footer-text">Palm Beach, FL 33480</p>
            </div>
          </div>
          
          <div className="copyright">
            <p>© 2024 Linda R. Olsson. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
} 