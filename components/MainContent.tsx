'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MessageChallenge from './MessageChallenge'
import RiddleHunt from './RiddleHunt'

export default function MainContent() {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [decrypted, setDecrypted] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 font-mono text-green-500">
        <div className="w-80 space-y-4">
          {/* Fake hash effect */}
          <div className="text-xs opacity-50 overflow-hidden">
            {Array(3).fill(0).map((_, i) => (
              <div key={i}>
                {Array(64).fill(0)
                  .map(() => Math.random().toString(16)[2])
                  .join('')}
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>System Boot Sequence:</span>
              <span>{loadingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-black border border-green-500">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Status messages */}
          <div className="space-y-1 text-sm">
            <div className="opacity-50">
              > Initializing neural interface...
            </div>
            {loadingProgress > 30 && (
              <div className="opacity-50">
                > Establishing secure connection...
              </div>
            )}
            {loadingProgress > 60 && (
              <div className="opacity-50">
                > Loading encryption protocols...
              </div>
            )}
            {loadingProgress > 90 && (
              <div className="opacity-50">
                > System ready for decryption...
              </div>
            )}
          </div>

          {/* Bottom hash effect */}
          <div className="text-xs opacity-50 overflow-hidden">
            {Array(2).fill(0).map((_, i) => (
              <div key={i}>
                {Array(64).fill(0)
                  .map(() => Math.random().toString(16)[2])
                  .join('')}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {!decrypted ? (
        <MessageChallenge onUnlock={() => setDecrypted(true)} />
      ) : (
        <RiddleHunt />
      )}
    </div>
  )
} 