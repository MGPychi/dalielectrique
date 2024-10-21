'use client'
import React, { useState } from 'react'
import { m as motion  } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Facebook, Phone, Twitter, Youtube, Instagram,  Menu } from 'lucide-react'
const links = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'About',
    href: '/about'
  },
  {
    title: 'Services',
    href: '/services'
  },
  {
    title: 'Contact Us',
    href: '/contact'

  }
]


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 text-sm border-b border-gray-700">
          <motion.a 
            href="mailto:admin@dalielictrique.ca" 
            className="hover:text-red-400 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
          >
            admin@dalielictrique.ca
          </motion.a>
          <div className="flex items-center space-x-4">
            {[Instagram, Facebook, Youtube, Twitter, Phone].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="hover:text-red-400 transition-colors duration-200"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="text-2xl md:text-3xl font-bold"
          >
            <span className="text-white">DALI</span>
            <span className="text-red-500">ELICTRIQUE</span>
          </motion.div>
          <nav className="hidden lg:flex items-center space-x-4">
            {links.map((item, index) => (
              <div key={index} className="relative group">
                  <Link 
                    href={item.href} 
                    className={` px-4 py-2.5 rounded-sm   font-medium hover:bg-red-500 hover:text-white  text-white  transition-colors duration-200 ${index === 0 ? 'text-red-500' : ''}`}
                  >
                    {item.title}
                  </Link>
              </div>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button className="bg-red-500 hidden lg:block hover:ring-2 hover:ring-red-400">
              Get a consultant
            </Button>
            <Button 
              variant="ghost" 
              className="lg:hidden text-white hover:text-red-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-gray-800 py-4"
        >
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            {links.map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className={`text-sm font-medium hover:text-red-400 transition-colors duration-200 ${index === 0 ? 'text-red-500' : ''}`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
      <div className="h-1 bg-gradient-to-r from-red-500 via-red-400 to-transparent"></div>
    </header>
  )
}

export default Header