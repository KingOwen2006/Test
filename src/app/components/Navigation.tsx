import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const sections = [
  { id: 'home', label: 'Grid' },
  { id: 'projects', label: 'Projects' },
]

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)

      // Determine active section
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 200 && rect.bottom > 200) {
          setActive(section.id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="flex items-center justify-center px-6 sm:px-10 py-4">
        {/* Navigation links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative px-3 py-1.5 text-xs tracking-[0.2em] uppercase transition-colors duration-200"
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 600,
                color: active === id ? '#ef4444' : 'rgba(255,255,255,0.55)',
              }}
            >
              {label}
              {active === id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-3 right-3 h-px bg-red-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom red stripe */}
      <div
        className="h-px transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, #dc2626, transparent)',
          opacity: scrolled ? 0.6 : 0.3,
        }}
      />
    </motion.nav>
  )
}

export default Navigation