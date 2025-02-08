'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onComplete: () => void
}

export default function DecryptionSequence({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [hashes, setHashes] = useState<string[]>([])

  useEffect(() => {
    // Generate random hash every 100ms
    const hashInterval = setInterval(() => {
      const newHash = Array(64).fill(0)
        .map(() => Math.random().toString(16)[2])
        .join('')
      setHashes(prev => [...prev.slice(-10), newHash])
    }, 100)

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(hashInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => {
      clearInterval(hashInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div className="text-center">
      <motion.div
        className="mb-8 font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="h-40 overflow-hidden">
          {hashes.map((hash, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-500"
            >
              {hash}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="w-80 bg-gray-800 rounded-full h-2 mb-4">
        <motion.div
          className="bg-cyan-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-cyan-500 font-mono">
        Decrypting... {progress}%
      </p>
    </div>
  )
} 