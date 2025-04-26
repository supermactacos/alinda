import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import Link from "next/link";

export function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      if (menu && !menu.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className={`container mx-auto px-4 py-4 ${isScrolled ? 'text-white' : 'text-white'}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            <img src="/logo.png" alt="Linda R. Olsson Logo" className="h-14" />
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="hover:text-pink-100 text-white">
            Home
          </Link>
          <Link href="/about" className="hover:text-pink-100 text-white">
            About
          </Link>
          <Link href="/north-end-palm-beach-real-estate" className="hover:text-pink-100 text-white">
            North End Homes
          </Link>
          <Link href="/in-town-palm-beach-real-estate" className="hover:text-pink-100 text-white">
            In Town Homes
          </Link>
          <Link href="/estate-section" className="hover:text-pink-100 text-white">
            Estate Section Homes
          </Link>
          <Link href="/in-town-condos" className="hover:text-pink-100 text-white">
            In Town Condominiums
          </Link>
          <Link href="/blog" className="hover:text-pink-100 text-white">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-pink-100 text-white">
            Contact
          </Link>
        </div>
        
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="fixed inset-0 bg-[#1b4e1f] z-50 md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu}>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-8 mt-12 text-2xl">
            <Link href="/" className="text-white hover:text-pink-100" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-pink-100" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/north-end-palm-beach-real-estate" className="text-white hover:text-pink-100" onClick={toggleMenu}>
              North End Homes
            </Link>
            <Link href="/in-town-palm-beach-real-estate" className="text-white hover:text-pink-100" onClick={toggleMenu}>
              In Town Homes
            </Link>
            <Link href="/estate-section" className="text-white hover:text-pink-100" onClick={toggleMenu}>
              Estate Section Homes
            </Link>
            <Link href="/in-town-condos" className="text-white hover:text-pink-100" onClick={toggleMenu}>
              In Town Condominiums
            </Link>
            <Link href="/blog" className="text-white hover:text-pink-100" onClick={toggleMenu}>
              Blog
            </Link>
            <Link href="/contact" className="text-white hover:text-pink-100" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 