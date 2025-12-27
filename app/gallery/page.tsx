"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const memories = [
  {
    id: 1,
    media: [
      "1.1.png",
      "1.2.png",
      "1.3.png",
      "1.4.png",
      "1.5.jpeg",
      "1.6.mp4",
      "1.7.png",
      "1.8.mp4"
    ],
    caption: "Ganesh Chaturthi 🐘✨ | Janmashtami 🦚💙 | Navratri 🌸🔥 | Diwali 🪔✨",
    date: "Aug-Oct 2025",
  },
  {
    id: 2,
    media: [
      "2.1.png",
      "2.2.png",
      "2.3.png",
      "2.4.png",
      "2.5.png"
    ],
    caption: "हर पहनावे में वही ख़ूबसूरत मुस्कान, साड़ी में सजी एक नज़ाकत. 🌷✨",
    date: "June 2025 - forever",
  },
  {
    id: 3,
    media: [
      "3.1.png",
      "3.2.png",
      "3.3.jpeg",
      "3.4.png"
    ],
    caption: "Miles apart, but love wrapped, packed, and delivered! 🎁✨",
    date: "Oct-Dec 2025",
  },
  {
    id: 4,
    media: [
      "4.1.png",
      "4.2.png",
      "4.3.png"
    ],
    caption: "Stepping out of the library, into long calls and white roses!🌹✨🤍📞",
    date: "June-Dec 2025",
  },
  {
    id: 5,
    media: [
      "5.1.png",
      "5.2.png",
      "5.3.png",
      "5.4.png",
      "5.5.png",
      "5.6.png"
    ],
    caption: "प्यार की वही सादगी, जहाँ एहसास बोलते हैं और शब्द कम पड़ जाते हैं — एक जुड़ाव जो दिल तक पहुँचता है ❤️✨",
    date: "June 2025 - forever",
  },
  {
    id: 6,
    media: [
      "6.1.png",
      "6.2.jpeg",
      "6.3.png",
      "6.4.png",
      "6.5.png"
    ],
    caption: "Little routines, shared moments — getting ready, together every morning✨🧴",
    date: "June-Dec 2025",
  },
  {
    id: 7,
    media: [
      "7.1.png",
      "7.2.png",
      "7.3.png",
      "7.4.png"
    ],
    caption: "When everything else rested the conversations stayed awake and felt safe and endless 🌙✨",
    date: "June-Dec 2025",
  },
  {
    id: 8,
    media: [
      "8.1.jpeg",
      "8.2.png"
    ],
    caption: "जन्मदिन की ढेर सारी शुभकामनाएँ, जानवी। आने वाला साल खुशियाँ, तरक़्क़ी और अनगिनत ख़ूबसूरत लम्हे लेकर आए 🎂✨❤️",
    date: "28 Dec 2025",
  },
]

const MomentCarousel = ({ media }: { media: string[] }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % media.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [media.length])

  return (
    <div className="relative aspect-[3/4] overflow-hidden group/carousel">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="absolute inset-0"
        >
          {media[current].includes(".mp4") ? (
            <video src={media[current]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={media[current] || "/placeholder.svg"} className="w-full h-full object-cover" />
          )}
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {media.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === current ? "bg-primary" : "bg-white/50"}`} />
        ))}
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background grid-background py-20 px-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-24 text-center">
          <Link href="/">
            <button className="mb-12 inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-all group">
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowLeft size={12} />
              </div>
              Back Home
            </button>
          </Link>
          <h1 className="text-7xl md:text-9xl font-serif italic mb-6 tracking-tighter text-foreground">Our Memories</h1>
          <p className="text-foreground/60 text-xl font-medium max-w-2xl mx-auto">
            A curated collection of moments that define our journey together.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage(memory.id)}
              className="cursor-pointer group"
            >
              <div className="bg-white rounded-[2rem] overflow-hidden window-shadow border border-border group-hover:border-primary/30 transition-all duration-500">
                <MomentCarousel media={memory.media} />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{memory.date}</span>
                    <Heart className="w-4 h-4 text-primary/20 group-hover:text-primary group-hover:fill-primary transition-all" />
                  </div>
                  <p className="font-serif text-xl italic text-foreground tracking-tight">{memory.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-[3rem] p-20 window-shadow border border-border"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif italic mb-6 tracking-tighter">More to Come</h2>
          <p className="text-foreground/60 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Every day with you is a new adventure. I can't wait to fill more albums with your beautiful smile.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/story">
              <button className="bg-foreground text-background px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-primary hover:text-white transition-all shadow-xl">
                Read Our Story
              </button>
            </Link>
            <Link href="/celebrate">
              <button className="bg-white text-foreground border border-border px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-muted transition-all shadow-xl">
                Celebrate Now
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-foreground/95 backdrop-blur-xl z-[200] flex items-center justify-center p-10 cursor-zoom-out"
        >
          <motion.img
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            src={memories.find((m) => m.id === selectedImage)?.media[0]}
            alt="Selected memory"
            className="max-w-full max-h-full object-contain rounded-[2rem] shadow-2xl"
          />
        </motion.div>
      )}
    </main>
  )
}
