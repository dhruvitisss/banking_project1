"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CakePage() {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true])
  const [isCut, setIsCut] = useState(false)
  const [hasKnife, setHasKnife] = useState(false)

  const toggleCandle = (index: number) => {
    const newCandles = [...candlesLit]
    newCandles[index] = false
    setCandlesLit(newCandles)
  }

  const allCandlesOut = candlesLit.every((c) => !c)

  return (
    <main className="relative w-full h-screen overflow-hidden bg-background grid-background flex flex-col items-center justify-center">
      <div className="absolute top-12 left-12 z-50">
        <Link href="/">
          <button className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors uppercase text-[10px] font-black tracking-widest">
            <ArrowLeft size={14} /> Back
          </button>
        </Link>
      </div>

      <div className="relative">
        {/* Cake Base */}
        <motion.div
          animate={isCut ? { x: [0, -20, -10] } : {}}
          className="relative w-64 h-40 bg-[#FAD0C4] rounded-t-3xl border-b-8 border-[#EE9CA7] shadow-2xl overflow-hidden"
        >
          {/* Frosting layers */}
          <div className="absolute top-0 w-full h-8 bg-white/20" />
          <div className="absolute top-12 w-full h-8 bg-white/10" />

          {/* Slice mark */}
          {isCut && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 top-0 bottom-0 w-2 bg-[#EE9CA7] shadow-inner"
            />
          )}
        </motion.div>

        {/* Plate */}
        <div className="w-80 h-4 bg-gray-100 rounded-full -mt-2 shadow-md" />

        {/* Candles */}
        <div className="absolute -top-16 inset-x-0 flex justify-center gap-8">
          {candlesLit.map((isLit, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div className="w-3 h-16 bg-gradient-to-t from-primary to-pink-300 rounded-full" />
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
                    onClick={() => toggleCandle(i)}
                    className="absolute -top-6 w-5 h-8 bg-orange-400 rounded-full blur-[2px] cursor-pointer"
                  >
                    <div className="absolute inset-x-1 top-2 bottom-1 bg-yellow-200 rounded-full opacity-50" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Interaction overlay */}
        {allCandlesOut && !isCut && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-24 inset-x-0 text-center"
          >
            {!hasKnife ? (
              <button
                onClick={() => setHasKnife(true)}
                className="px-8 py-3 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Pick up Knife
              </button>
            ) : (
              <motion.div
                drag
                dragSnapToOrigin
                onDragEnd={(_, info) => {
                  if (Math.abs(info.point.x - window.innerWidth / 2) < 100) {
                    setIsCut(true)
                  }
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <div className="w-32 h-8 bg-gray-300 rounded-full border-2 border-gray-400 flex items-center justify-center font-black text-[8px] uppercase tracking-widest text-gray-600">
                  Slice the cake here
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isCut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-24 text-center"
          >
            <div className="flex items-center gap-4 justify-center mb-4">
              <Sparkles className="text-primary" />
              <h1 className="text-6xl font-serif italic tracking-tighter">Happy Birthday Janvi!</h1>
              <Sparkles className="text-primary" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/40">
              Enjoy your day, meri cute si pyari si choti si baby!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 text-center text-[10px] font-black uppercase tracking-widest text-foreground/30">
        {!allCandlesOut
          ? "Click the flames to blow them out"
          : isCut
            ? "A sweet treat for a sweet soul"
            : "Now cut the cake!"}
      </div>
    </main>
  )
}
