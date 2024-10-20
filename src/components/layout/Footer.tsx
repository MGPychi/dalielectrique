import React from 'react'
import {m as motion } from "framer-motion"
import Image from 'next/image'

const Footer = () => {
  return (
          <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex justify-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Image src="/placeholder.svg" alt="Electrical Safety Authority 1" width={100} height={50} />
            <Image src="/placeholder.svg" alt="Electrical Safety Authority 2" width={100} height={50} />
          </motion.div>
        </div>
      </footer>

  )
}

export default Footer