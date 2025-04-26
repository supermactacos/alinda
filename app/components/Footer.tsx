import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 bg-[#012a12] border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-light mb-5">Linda R. Olsson</h3>
            <p className="text-gray-400 text-lg">Luxury Real Estate in Palm Beach and Beyond</p>
          </div>
          <div>
            <h4 className="text-xl font-light mb-5">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="https://mlspalmbeach.lindaolsson.com/i/featured-properties">Featured Properties</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-light mb-5">Search by Neighborhood</h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              <li>
                <Link href="/north-end-palm-beach-real-estate">North End Homes</Link>
              </li>
              <li>
                <Link href="/in-town-palm-beach-real-estate">In Town Homes</Link>
              </li>
              <li>
                <Link href="/estate-section">Estate Section Homes</Link>
              </li>
              <li>
                <Link href="/in-town-condos">In Town Condominiums</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-light mb-5">Contact Us</h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              <li>(561) 820-9195</li>
              <li>linda@lindaolsson.com</li>
              <li>101 Bradley Place</li>
              <li>Palm Beach, FL 33480</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-16 pt-10 text-center text-gray-400 text-lg">
          <p>© 2024 Linda R. Olsson. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 