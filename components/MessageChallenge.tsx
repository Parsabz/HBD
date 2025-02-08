'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onUnlock: () => void
}

export default function MessageChallenge({ onUnlock }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  
  // This is where you'll set your secret password
  const CORRECT_PASSWORD = '2025'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      onUnlock()
    } else {
      setError(true)
      setTimeout(() => setError(false), 1000)
    }
  }

  return (
    <div className="max-w-md w-full">
      <motion.form 
        onSubmit={handleSubmit}
        className="space-y-4 font-mono text-green-500 bg-black/80 p-8 rounded-lg border border-green-500/30"
        animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Fake hash effect at the top */}
        <div className="text-xs opacity-50 overflow-hidden">
          {Array(2).fill(0).map((_, i) => (
            <div key={i}>
              {Array(64).fill(0)
                .map(() => Math.random().toString(16)[2])
                .join('')}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold glitch-text">
            > Amirho$$ein.exe
          </h2>
          
          <div className="relative">
            <span className="absolute left-2 top-2 opacity-50">$</span>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-8 pr-4 py-2 bg-black border border-green-500 
                       rounded-md focus:outline-none focus:ring-2 
                       focus:ring-green-500 text-green-500 font-mono"
              placeholder="Enter decryption key..."
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-green-500 font-bold 
                     rounded-md border border-green-500
                     hover:bg-green-500/20 transition-colors duration-200"
          >
            {'>'} DECRYPT_MESSAGE
          </button>
        </div>

        {/* Fake hash effect at the bottom */}
        <div className="text-xs opacity-50 overflow-hidden">
          {Array(2).fill(0).map((_, i) => (
            <div key={i}>
              {Array(64).fill(0)
                .map(() => Math.random().toString(16)[2])
                .join('')}
            </div>
          ))}
        </div>
      </motion.form>
    </div>
  )
} 