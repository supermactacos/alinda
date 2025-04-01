import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 bg-[#012a12] border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-light mb-5">Linda R. Olson</h3>
            <p className="text-gray-400 text-lg">Luxury Real Estate in Palm Beach and Beyond</p>
          </div>
          <div>
            <h4 className="text-xl font-light mb-5">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              <li>
                <Link href="#">Properties</Link>
              </li>
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Services</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-light mb-5">Areas We Serve</h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              <li>
                <Link href="#">Palm Beach</Link>
              </li>
              <li>
                <Link href="#">Jupiter</Link>
              </li>
              <li>
                <Link href="#">West Palm Beach</Link>
              </li>
              <li>
                <Link href="#">Palm Beach Gardens</Link>
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
          <p>© 2024 Linda R. Olson. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 