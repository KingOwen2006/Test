import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const LandingSection = ({ id }: { id: string }) => {
  const [lightsOn, setLightsOn] = useState(0) // 0-5: red lights, 6: all green

  // Track scroll to animate lights
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(id)
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = rect.height
      const viewportHeight = window.innerHeight

      // Progress from 0 to 1 as user scrolls through the section
      let progress = 0
      if (rect.top < viewportHeight && rect.bottom > 0) {
        progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (sectionHeight + viewportHeight)))
      }

      // Light sequence: 0-0.7 → lights turn red one by one, 0.7-1.0 → all green
      if (progress < 0.7) {
        const lightProgress = progress / 0.7
        setLightsOn(Math.floor(lightProgress * 5))
      } else {
        setLightsOn(6) // All green
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [id])

  return (
    <section
      id={id}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #050505 100%)',
      }}
    >
      {/* Content container */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        {/* Starting lights */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 flex justify-center gap-3"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-zinc-800 bg-zinc-900 transition-all duration-300"
              style={{
                boxShadow:
                  lightsOn === 6
                    ? '0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.4)'
                    : lightsOn > i
                    ? '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.4)'
                    : 'none',
                background:
                  lightsOn === 6
                    ? 'radial-gradient(circle, #00ff00 0%, #00aa00 100%)'
                    : lightsOn > i
                    ? 'radial-gradient(circle, #ff0000 0%, #aa0000 100%)'
                    : '#1a1a1a',
              }}
            />
          ))}
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1
            className="text-white tracking-[0.15em] uppercase mb-6"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              lineHeight: 1.1,
              textShadow: '0 0 40px rgba(255, 0, 0, 0.3)',
            }}
          >
            Owen King
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p
            className="text-red-500/80 tracking-[0.5em] uppercase mb-8"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
            }}
          >
            Full Stack Developer
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mb-12"
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col items-center gap-3"
        >
          <p
            className="text-white/50 tracking-[0.3em] uppercase text-xs"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
          >
            Scroll to Start
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlay at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #050505)',
        }}
      />
    </section>
  )
}

export default LandingSection