import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/placeholder.svg?height=50&width=100" alt="Zak Electric Logo" className="h-12" />
            <p className="text-sm">
              Zak Electric is a neighborhood, family-possessed organization, zeroed in on giving the best electrical technician administrations. We highly esteem the quality and security of the work we do in your home or business.
            </p>
            <p className="text-sm">ESA 7015394</p>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/residential" className="hover:text-primary transition-colors">Residential</Link></li>
              <li><Link href="/services/commercial" className="hover:text-primary transition-colors">Commercial</Link></li>
              <li><Link href="/services/industrial" className="hover:text-primary transition-colors">Industrial</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>50 Ottawa St S, - Kitchener</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>226-222-3000</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>WhatsApp: 226-222-3000</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>admin@zakelectric.ca</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 flex flex-wrap gap-4">
          <img src="/placeholder.svg?height=50&width=100" alt="Electrical Contractor Registration Agency" className="h-12" />
          <img src="/placeholder.svg?height=50&width=100" alt="Electrical Safety Authority" className="h-12" />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-4 border-t border-gray-700 flex flex-wrap justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} ZAK ELECTRIC. All Rights Reserved.</p>
          <p>Designed & Developed by Webelocity</p>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <Link href="/legal" className="hover:text-primary transition-colors">Legal Disclaimer</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer