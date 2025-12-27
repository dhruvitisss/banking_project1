"use client"

import { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              setError(null)
              console.log("[v0] Music started successfully")
            })
            .catch((e) => {
              console.log("[v0] Audio play blocked/failed:", e)
              setError("Click to play")
              setIsPlaying(false)
            })
        }
      }
    }
  }

  return (
    <div className="fixed top-8 right-8 z-[100]">
      <div
        className="glass-morphism rounded-full p-2 flex items-center gap-3 window-shadow cursor-pointer transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={togglePlay} // added click handler to the whole bar for easier play
      >
        <button className="bg-primary text-white p-3 rounded-full hover:bg-opacity-90 transition-all shadow-lg shrink-0">
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>

        <AnimatePresence>
          {(isExpanded || !isPlaying) && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center gap-3 pr-4 overflow-hidden whitespace-nowrap"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                  {error || (isPlaying ? "Playing Now" : "Music Paused")}
                </span>
                <span className="text-sm font-serif italic font-medium">Romantic Birthday Melody</span>
              </div>
              <div className="flex gap-1 h-3 items-end">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={isPlaying ? { height: [4, 12, 6, 10, 4] } : { height: 4 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: i * 0.1 }}
                    className="w-1 bg-primary rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden Audio Element - Using a dummy URL */}
      <audio ref={audioRef} loop src="https://drive.google.com/file/d/1y2ZQgYH-lRMxkVhJFm2bVq3DHC5kCYsQ/view?usp=sharing" />
    </div>
  )
}
