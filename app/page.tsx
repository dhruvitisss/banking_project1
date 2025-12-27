"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Camera, Sparkles, Gamepad2, Cake } from "lucide-react"
import Link from "next/link"

const FloatingWindow = ({
  children,
  title,
  initialX = 0,
  initialY = 0,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  title: string
  initialX?: number
  initialY?: number
  delay?: number
  className?: string
}) => (
  <motion.div
    drag
    dragMomentum={false}
    initial={{ opacity: 0, scale: 0.8, x: initialX, y: initialY + 50 }}
    animate={{ opacity: 1, scale: 1, x: initialX, y: initialY }}
    transition={{ delay, type: "spring", damping: 15 }}
    className={`absolute z-10 bg-white border border-gray-100 rounded-2xl window-shadow overflow-hidden w-72 md:w-96 cursor-grab active:cursor-grabbing ${className}`}
  >
    <div className="bg-gray-50/50 px-4 py-2 border-b border-gray-100 flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{title}</span>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-gray-200" />
        <div className="w-2 h-2 rounded-full bg-gray-200" />
      </div>
    </div>
    <div className="p-6">{children}</div>
  </motion.div>
)

export default function BirthdayPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full min-h-screen grid-background bg-background flex flex-col items-center justify-start py-24 px-6 overflow-x-auto"
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [Math.random() * 100 + "vw", Math.random() * 100 + "vw"],
              y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
            className="absolute w-2 h-2 rounded-full bg-primary/40 blur-xl"
          />
        ))}
      </div>

      <motion.div
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-[0.05] overflow-hidden"
      >
        <h1 className="text-[30vw] font-black tracking-tighter leading-none">LOVE</h1>
      </motion.div>

      <div className="max-w-4xl w-full relative z-20 text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-7xl md:text-9xl font-serif italic tracking-tighter leading-[0.9] text-foreground mb-8"
        >
          Happy <span className="text-primary block not-italic font-black">Birthday Janvi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-foreground/60 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed text-balance"
        >
          I've created this digital universe for you. Every pixel is filled with our memories and my love.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full relative z-20 mb-24">
        {[
          {
            href: "/gallery",
            icon: Camera,
            label: "Gallery",
            color: "bg-blue-500/10 text-blue-500",
            bg: "url('/romantic-memories-gallery.jpg')",
          },
          {
            href: "/story",
            icon: Sparkles,
            label: "Story",
            color: "bg-purple-500/10 text-purple-500",
            bg: "url('/romantic-couple-sunset-beach.jpg')",
          },
          {
            href: "/balloons",
            icon: Gamepad2,
            label: "Game",
            color: "bg-pink-500/10 text-pink-500",
            bg: "url('/couple-dancing-party-lights.jpg')",
          },
          {
            href: "/cake",
            icon: Cake,
            label: "Cake",
            color: "bg-orange-500/10 text-orange-500",
            bg: "url('/couple-laughing-cafe-coffee.jpg')",
          },
        ].map((item, i) => (
          <Link key={item.label} href={item.href} className="group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-8 rounded-3xl window-shadow border border-border flex flex-col items-center text-center transition-all group-hover:border-primary/50"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-cover bg-center"
                style={{ backgroundImage: item.bg }}
              />
              <div
                className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 transition-all`}
              >
                <item.icon size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full px-6 flex justify-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring", damping: 20 }}
          className="glass-morphism px-4 md:px-8 py-4 rounded-full flex items-center gap-4 md:gap-8 text-foreground shadow-2xl border border-white/20"
        >
          <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2 px-2">
              <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
            </Link>
            <Link href="/gallery" className="hover:text-primary transition-colors flex items-center gap-2 px-2">
              <span className="text-[10px] font-black uppercase tracking-widest">Gallery</span>
            </Link>
            <Link href="/balloons" className="hover:text-primary transition-colors flex items-center gap-2 px-2">
              <span className="text-[10px] font-black uppercase tracking-widest">Pop It</span>
            </Link>
            <Link href="/cake" className="hover:text-primary transition-colors flex items-center gap-2 px-2">
              <span className="text-[10px] font-black uppercase tracking-widest">Party</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}
