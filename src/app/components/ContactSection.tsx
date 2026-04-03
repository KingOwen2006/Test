import React from 'react'
import { Github, Linkedin, Twitter, Instagram, Youtube, Mail } from 'lucide-react'
import { motion } from 'motion/react'

const socials = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/kingowen',
    color: '#ffffff',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/kingowen',
    color: '#0A66C2',
  },
  {
    name: 'Twitter / X',
    icon: Twitter,
    url: 'https://twitter.com/kingowen',
    color: '#1DA1F2',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/kingowen',
    color: '#E1306C',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com/@kingowen',
    color: '#FF0000',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:hello@kingowen.com',
    color: '#ff1800',
  },
]

// Checkered square count – drawn with SVG for scalable patterns
function CheckeredBand({ rows = 3 }: { rows?: number }) {
  const squareSize = 48
  const cols = 40
  const height = squareSize * rows

  return (
    <svg
      width="100%"
      height={height}
      style={{ display: 'block' }}
      aria-hidden
    >
      <defs>
        <pattern
          id="checker"
          x="0"
          y="0"
          width={squareSize * 2}
          height={squareSize * 2}
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width={squareSize} height={squareSize} fill="#0f0f0f" />
          <rect x={squareSize} y="0" width={squareSize} height={squareSize} fill="#ffffff" />
          <rect x="0" y={squareSize} width={squareSize} height={squareSize} fill="#ffffff" />
          <rect x={squareSize} y={squareSize} width={squareSize} height={squareSize} fill="#0f0f0f" />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill="url(#checker)" />
    </svg>
  )
}

const ContactSection = ({ id }: { id: string }) => {
  return (
    <section id={id} className="relative overflow-hidden" style={{ background: '#050505' }}>
      {/* Top checkered band */}
      <CheckeredBand rows={2} />

      {/* Finish banner */}
      <div
        className="w-full py-4 text-center"
        style={{
          background: 'linear-gradient(180deg, #0f0f0f 0%, #050505 100%)',
          borderTop: '3px solid #fff',
          borderBottom: '3px solid #fff',
        }}
      >
        <span
          className="text-white tracking-[0.8em] uppercase text-xs"
          style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 }}
        >
          Finish Line
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p
            className="text-red-600/60 tracking-[0.6em] uppercase text-xs mb-4"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
          >
            Race Complete
          </p>
          <h2
            className="text-white tracking-[0.3em] uppercase"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
            }}
          >
            Contact Me
          </h2>
          <div className="mt-5 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        </motion.div>

        {/* Social grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-xl w-full">
          {socials.map(({ name, icon: Icon, url, color }, i) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-white/20 transition-all duration-300"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                }}
              >
                <Icon
                  size={22}
                  className="transition-all duration-300"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                />
              </div>
              <span
                className="text-white/45 group-hover:text-white/80 text-xs tracking-[0.25em] uppercase transition-colors duration-200"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 }}
              >
                {name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom checkered band */}
      <CheckeredBand rows={2} />

      {/* Footer */}
      <div
        className="py-4 text-center"
        style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <p
          className="text-white/20 text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
        >
          © {new Date().getFullYear()} Owen · Built with passion
        </p>
      </div>
    </section>
  )
}

export default ContactSection