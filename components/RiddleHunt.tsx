'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const RIDDLES = [
  {
    question: "In the realm of innovation, where dreams seek support, a structure stands strong. Its foundation is built on three pillars—each representing a step towards success. Decode its initials, and you'll find the key to unlocking new possibilities. What is it?",
    answer: "3F",
    tutorial: "https://www.youtube.com/embed/PeqP6oVnlIs"
  },
  {
    question: "Who is the greatest person in the world born today (or just a few days ago)?",
    answer: "me",
    tutorial: "https://www.youtube.com/embed/uMg598-3wIk"
  }
]

const ASCII_ART = `
  ╦ ╦╔═╗╔═╗╔═╗╦ ╦
  ╠═╣╠═╣╠═╝╠═╝╚╦╝
  ╩ ╩╩ ╩╩  ╩   ╩ 
  ╔╗ ╦╦═╗╔╦╗╦ ╦╔╦╗╔═╗╦ ╦
  ╠╩╗║╠╦╝ ║ ╠═╣ ║║╠═╣╚╦╝
  ╚═╝╩╩╚═ ╩ ╩ ╩═╩╝╩ ╩ ╩ 
  ╔═╗╔╦╗╦╦═╗╦ ╦╔═╗╔═╗╔═╗╦╔╗╔
  ╠═╣║║║║╠╦╝╠═╣║ ║╚═╗║╣ ║║║║
  ╩ ╩╩ ╩╩╩╚═╩ ╩╚═╝╚═╝╚═╝╩╝╚╝
`

export default function RiddleHunt() {
  const [currentRiddle, setCurrentRiddle] = useState(0)
  const [answer, setAnswer] = useState('')
  const [unlockedTutorials, setUnlockedTutorials] = useState<number[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationText, setCelebrationText] = useState('')
  const [fakeHashes, setFakeHashes] = useState<string[]>([])

  useEffect(() => {
    if (unlockedTutorials.length === RIDDLES.length) {
      setShowCelebration(true)
      startCelebrationAnimation()
    }
  }, [unlockedTutorials])

  const startCelebrationAnimation = () => {
    let hashCount = 0
    const hashInterval = setInterval(() => {
      const newHash = Array(64).fill(0)
        .map(() => Math.random().toString(16)[2])
        .join('')
      setFakeHashes(prev => [...prev.slice(-5), newHash])
      hashCount++
      
      if (hashCount > 20) {
        clearInterval(hashInterval)
        typeMessage()
      }
    }, 100)
  }

  const typeMessage = () => {
    const messages = [
      ASCII_ART,
      "\nFrom your best friend, Parsa :)))\n",
      "\nWish you a timeless year ahead <345678910 \n"
    ]
    let fullMessage = ''
    let messageIndex = 0
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (messageIndex >= messages.length) {
        clearInterval(typeInterval)
        return
      }

      if (charIndex >= messages[messageIndex].length) {
        messageIndex++
        charIndex = 0
        return
      }

      fullMessage += messages[messageIndex][charIndex]
      setCelebrationText(fullMessage)
      charIndex++
    }, 50)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clean up both the submitted answer and expected answer
    const submittedAnswer = answer.toLowerCase().trim()
    const expectedAnswer = RIDDLES[currentRiddle].answer.toLowerCase().trim()
    
    // Debug logs
    console.log('Submitted answer:', submittedAnswer)
    console.log('Expected answer:', expectedAnswer)
    console.log('Current riddle:', currentRiddle)
    console.log('Are they equal?', submittedAnswer === expectedAnswer)
    
    // Check if the answer is correct
    if (submittedAnswer === expectedAnswer || 
        // Add alternative answers for "3F"
        (expectedAnswer === "3f" && 
         (submittedAnswer === "3f" || 
          submittedAnswer === "3-f" || 
          submittedAnswer === "three f" || 
          submittedAnswer === "threef"))) {
      
      console.log('Correct answer!')
      setUnlockedTutorials(prev => {
        if (!prev.includes(currentRiddle)) {
          return [...prev, currentRiddle]
        }
        return prev
      })
      setAnswer('')
    } else {
      console.log('Wrong answer!')
    }
  }

  const goToNextRiddle = () => {
    if (currentRiddle < RIDDLES.length - 1) {
      setCurrentRiddle(prev => prev + 1)
      setAnswer('')
    }
  }

  const goToPreviousRiddle = () => {
    if (currentRiddle > 0) {
      setCurrentRiddle(prev => prev - 1)
      setAnswer('')
    }
  }

  const allRiddlesSolved = unlockedTutorials.length === RIDDLES.length

  const handleHBDClick = () => {
    setShowCelebration(true)
    startCelebrationAnimation()
  }

  if (showCelebration) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="font-mono text-green-500 bg-black p-8 rounded-lg border border-green-500/30">
          {fakeHashes.map((hash, i) => (
            <div key={i} className="opacity-50">{hash}</div>
          ))}
          <pre className="text-green-500 mt-4 whitespace-pre">
            {celebrationText}
          </pre>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 font-mono text-green-500 bg-black/80 p-8 rounded-lg border border-green-500/30 shadow-lg shadow-green-500/20"
      >
        <div className="opacity-50 text-xs overflow-hidden">
          {Array(3).fill(0).map((_, i) => (
            <div key={i}>
              {Array(64).fill(0)
                .map(() => Math.random().toString(16)[2])
                .join('')}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4 border-b border-green-500/30 pb-4">
          <h2 className="text-2xl font-bold glitch-text">
            > RIDDLE_{currentRiddle + 1}.exe
          </h2>
          <div className="space-x-4">
            <button
              onClick={goToPreviousRiddle}
              disabled={currentRiddle === 0}
              className="px-4 py-2 bg-black text-green-500 font-bold rounded-md
                       border border-green-500 hover:bg-green-500/20 
                       transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'<<'} PREV
            </button>
            <button
              onClick={goToNextRiddle}
              disabled={currentRiddle === RIDDLES.length - 1}
              className="px-4 py-2 bg-black text-green-500 font-bold rounded-md
                       border border-green-500 hover:bg-green-500/20
                       transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              NEXT {'>>'}
            </button>
          </div>
        </div>
        
        <div className="space-y-4 relative">
          <p className="text-lg font-mono">
            > {RIDDLES[currentRiddle].question}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-2 top-2 opacity-50">$</span>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-black border border-green-500 
                         rounded-md focus:outline-none focus:ring-2 
                         focus:ring-green-500 text-green-500 font-mono"
                placeholder="Enter answer..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-green-500 font-bold 
                       rounded-md border border-green-500
                       hover:bg-green-500/20 transition-colors duration-200"
            >
              {'>'} EXECUTE
            </button>
          </form>

          {unlockedTutorials.includes(currentRiddle) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 border border-green-500/30 rounded-lg overflow-hidden"
            >
              <div className="bg-green-500/10 p-2 border-b border-green-500/30">
                > TUTORIAL_UNLOCKED.mp4
              </div>
              <iframe
                width="100%"
                height="315"
                src={RIDDLES[currentRiddle].tutorial}
                title="Tutorial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          )}
        </div>

        <div className="opacity-50 text-xs overflow-hidden mt-4">
          {Array(2).fill(0).map((_, i) => (
            <div key={i}>
              {Array(64).fill(0)
                .map(() => Math.random().toString(16)[2])
                .join('')}
            </div>
          ))}
        </div>

        {allRiddlesSolved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleHBDClick}
              className="px-8 py-4 bg-black text-green-500 font-bold text-xl
                       rounded-md border-2 border-green-500
                       hover:bg-green-500/20 transition-colors duration-200
                       animate-pulse"
            >
              {'>'} EXECUTE_HBD.exe
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
} 