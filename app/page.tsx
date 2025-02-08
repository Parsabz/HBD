'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DecryptionSequence from '@/components/DecryptionSequence'
import MainContent from '@/components/MainContent'

export default function Home() {
  const [isDecrypted, setIsDecrypted] = useState(false)

  const handleDecryptionComplete = () => {
    setIsDecrypted(true)
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      {!isDecrypted ? (
        <DecryptionSequence onComplete={handleDecryptionComplete} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <MainContent />
        </motion.div>
      )}
    </main>
  )
} 