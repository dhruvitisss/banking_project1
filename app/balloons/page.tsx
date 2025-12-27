"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Balloon {
  id: number
  x: number
  color: string
  size: number
}

function BlastEffect({ x, y, color }: { x: number; y: number; color: string }) {
  const particles = Array.from({ length: 12 })
  return (
    <div className="fixed z-[100] pointer-events-none" style={{ left: x, top: y }}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 1.5, opacity: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            scale: 0,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 0.6, ease: "circOut" }}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        className="absolute text-xl font-black text-primary -translate-x-1/2 -translate-y-1/2"
      >
        POP!
      </motion.div>
    </div>
  )
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6C5CE7", "#A8E6CF", "#FF8B94"]

export default function BalloonGame() {
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [poppedCount, setPoppedCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [blasts, setBlasts] = useState<{ id: number; x: number; y: number; color: string }[]>([])

  useEffect(() => {
    if (isFinished) return

    const interval = setInterval(() => {
      setBalloons((prev) => {
        if (prev.length >= 10) return prev
        return [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            size: Math.random() * 40 + 60,
          },
        ]
      })
    }, 800)

    return () => clearInterval(interval)
  }, [isFinished])

  const popBalloon = useCallback(
    (e: React.MouseEvent, id: number, color: string) => {
      e.stopPropagation()
      setBlasts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          color,
        },
      ])

      setBalloons((prev) => prev.filter((b) => b.id !== id))
      const nextCount = poppedCount + 1
      setPoppedCount(nextCount)

      if (nextCount >= 21) {
        setIsFinished(true)
      }
    },
    [poppedCount],
  )

  return (
    <main className="relative w-full h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* HUD */}
      <div className="absolute top-12 left-12 z-50">
        <Link href="/">
          <button className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors uppercase text-[10px] font-black tracking-widest">
            <ArrowLeft size={14} /> Back
          </button>
        </Link>
      </div>

      <div className="absolute top-12 right-12 z-50 text-right">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Popped</span>
        <div className="text-4xl font-serif italic">{poppedCount} / 21</div>
      </div>

      {blasts.map((blast) => (
        <BlastEffect key={blast.id} {...blast} />
      ))}

      <AnimatePresence>
        {!isFinished ? (
          balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              initial={{ y: "110vh" }}
              animate={{ y: "-20vh" }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 7, ease: "linear" }}
              onAnimationComplete={() => setBalloons((prev) => prev.filter((b) => b.id !== balloon.id))}
              onClick={(e) => popBalloon(e, balloon.id, balloon.color)}
              className="absolute cursor-pointer"
              style={{ left: `${balloon.x}%` }}
            >
              <motion.div
                whileTap={{ scale: 1.5 }}
                className="rounded-full shadow-lg relative"
                style={{
                  width: balloon.size,
                  height: balloon.size * 1.2,
                  backgroundColor: balloon.color,
                  boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.1), 0 0 30px ${balloon.color}44`,
                }}
              >
                <div className="absolute top-[20%] left-[20%] w-[20%] h-[20%] bg-white/30 rounded-full blur-[2px]" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-inherit brightness-75" />
              </motion.div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h1 className="text-7xl md:text-9xl font-serif italic tracking-tighter text-primary leading-none">
              Happy Birthday Janvi
            </h1>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.5em] text-foreground/40">Exquisite Collection</p>
            <Link href="/cake" className="mt-12">
              <button className="px-10 py-4 bg-primary text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-foreground transition-all shadow-xl">
                Enter Ceremony
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
