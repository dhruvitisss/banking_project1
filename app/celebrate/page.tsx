"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, ArrowLeft, Star, Gift } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"

const birthdayMessages = [
  "You're the most amazing person I know.",
  "Every day with you is a gift.",
  "I love you more than words can say.",
  "To many more birthdays together!",
  "You're my everything, today and always.",
  "May your day be as beautiful as your smile.",
]

export default function CelebratePage() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isSparkling, setIsSparkling] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % birthdayMessages.length)
    }, 4000)

    // Trigger initial confetti
    triggerConfetti()

    return () => clearInterval(interval)
  }, [])

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#ffffff", "#ff4d4d"],
    })
    setIsSparkling(true)
    setTimeout(() => setIsSparkling(false), 1000)
  }

  return (
    <main className="min-h-screen bg-background grid-background flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: Math.random() * 100 + "vw" }}
            animate={{ y: "-10vh" }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            className="absolute text-primary"
          >
            {i % 2 === 0 ? <Heart size={24} /> : <Star size={24} />}
          </motion.div>
        ))}
      </div>

      {/* Back Button */}
      <div className="absolute top-12 left-12 z-50">
        <Link href="/">
          <button className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-all group">
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft size={12} />
            </div>
            Back Home
          </button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
      >
        <motion.div
          animate={isSparkling ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
          onClick={triggerConfetti}
          className="cursor-pointer mb-12 relative group"
        >
          <div className="absolute inset-0 bg-primary blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="bg-white p-12 rounded-full border border-border shadow-2xl relative">
            <Gift className="w-24 h-24 text-primary" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded-full shadow-lg"
          >
            <Sparkles size={24} />
          </motion.div>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-serif italic mb-12 tracking-tighter leading-none text-foreground">
          It's Time to <span className="text-primary">Celebrate!</span>
        </h1>

        <div className="h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl md:text-4xl font-serif italic text-foreground/70"
            >
              "{birthdayMessages[currentMessage]}"
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerConfetti}
          className="mt-12 px-12 py-5 bg-foreground text-background rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all window-shadow"
        >
          Click for More Love
        </motion.button>
      </motion.div>

      {/* Decorative Labels */}
      <div className="absolute bottom-12 left-12">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Mode</span>
          <span className="text-xs font-bold uppercase italic text-primary">Ultra Romantic</span>
        </div>
      </div>
    </main>
  )
}
