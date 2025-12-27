"use client"

import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Heart } from "lucide-react"
import Link from "next/link"

const storyEvents = [
  {
    year: "2022",
    title: "The First Hello",
    description: "The moment our worlds collided. I didn't know then that my life was about to change forever.",
    icon: <Sparkles className="text-primary" size={20} />,
  },
  {
    year: "2023",
    title: "Endless Summers",
    description: "Beach days, road trips, and finding my best friend in you. Every day felt like a dream.",
    icon: <Sun className="text-yellow-500" size={20} />,
  },
  {
    year: "2024",
    title: "Building Our Future",
    description: "Supporting each other's dreams and realizing that home isn't a place, it's a person.",
    icon: <Home className="text-blue-500" size={20} />,
  },
  {
    year: "2025",
    title: "Happy Birthday",
    description: "Another year of loving you, and I'm just getting started. Here's to us.",
    icon: <Heart className="text-red-500 fill-red-500" size={20} />,
  },
]

import { Sparkles, Sun, Home } from "lucide-react"

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-background grid-background py-20 px-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
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
          <div className="flex items-center justify-center gap-4 mb-6">
            <BookOpen className="text-primary" size={32} />
          </div>
          <h1 className="text-7xl md:text-9xl font-serif italic mb-6 tracking-tighter text-foreground">Our Story</h1>
          <p className="text-foreground/60 text-xl font-medium max-w-2xl mx-auto italic">
            "A timeline of us, captured in moments and memories."
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-24 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {storyEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-white shadow-xl z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                {event.icon}
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 rounded-[2rem] bg-white border border-border window-shadow group-hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-black text-primary uppercase tracking-[0.2em]">{event.year}</span>
                </div>
                <h3 className="text-3xl font-serif italic mb-4 text-foreground tracking-tight">{event.title}</h3>
                <p className="text-foreground/60 leading-relaxed font-medium">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <h2 className="text-4xl font-serif italic mb-12">And the best is yet to come...</h2>
          <div className="flex gap-4 justify-center">
            <Link href="/gallery">
              <button className="bg-foreground text-background px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all">
                View Memory Vault
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
