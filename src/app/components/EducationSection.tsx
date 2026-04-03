import React, { useState } from 'react'
import { useWordPressPosts, WPPost } from '../hooks/useWordPress'
import PostCard from './PostCard'
import PostModal from './PostModal'
import { motion } from 'motion/react'

const CARD_SPACING = 340
const PAD_TOP = 60
const PAD_BOTTOM = 100
const SVG_W = 1000

const EducationSection = ({ id }: { id: string }) => {
  const { posts, loading, error } = useWordPressPosts('kingowenfyi.wordpress.com', 10)
  const [selectedPost, setSelectedPost] = useState<WPPost | null>(null)

  const sortedPosts = [...posts].sort((a, b) =>
    a.title.rendered.replace(/<[^>]+>/g, '').localeCompare(
      b.title.rendered.replace(/<[^>]+>/g, ''),
      undefined,
      { sensitivity: 'base' }
    )
  )

  const numPosts = sortedPosts.length
  const sectionH = Math.max(700, numPosts * CARD_SPACING + PAD_TOP + PAD_BOTTOM)

  // Each card's Y center
  const cardCenters = Array.from({ length: numPosts }, (_, i) =>
    PAD_TOP + i * CARD_SPACING + CARD_SPACING / 2
  )

  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{ background: '#070707' }}
    >
      {/* Section header */}
      <div className="relative z-10 pt-24 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-red-600/70 tracking-[0.6em] uppercase text-xs mb-3"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
          >
            Straight Line Speed
          </p>
          <h2
            className="text-white tracking-[0.25em] uppercase"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 6vw, 4rem)',
            }}
          >
            Education
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        </motion.div>
      </div>

      {/* Road + Cards area */}
      <div className="relative" style={{ height: sectionH }}>
        {/* SVG Straight Road */}
        <svg
          viewBox={`0 0 ${SVG_W} ${sectionH}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
        >
          {/* Ground (extended asphalt run-off) */}
          <rect x="420" y="0" width="160" height={sectionH} fill="#151515" />
          {/* Road surface */}
          <rect x="440" y="0" width="120" height={sectionH} fill="#1c1c1c" />
          {/* Left edge line */}
          <line x1="440" y1="0" x2="440" y2={sectionH} stroke="#dddddd" strokeWidth="3.5" opacity="0.5" />
          {/* Right edge line */}
          <line x1="560" y1="0" x2="560" y2={sectionH} stroke="#dddddd" strokeWidth="3.5" opacity="0.5" />
          {/* Center dashed line */}
          <line
            x1="500"
            y1="0"
            x2="500"
            y2={sectionH}
            stroke="#ffffff"
            strokeWidth="3"
            strokeDasharray="32 22"
            opacity="0.6"
          />
          {/* Connector lines to each card */}
          {cardCenters.map((y, i) => {
            const isLeft = i % 2 === 0
            const roadEdge = isLeft ? 440 : 560
            const cardEdge = isLeft ? 320 : 680
            return (
              <g key={i}>
                {/* Horizontal connector */}
                <line
                  x1={roadEdge}
                  y1={y}
                  x2={cardEdge}
                  y2={y}
                  stroke="#ff1800"
                  strokeWidth="2"
                  strokeDasharray="10 8"
                  opacity="0.45"
                />
                {/* Node dot on road edge */}
                <circle
                  cx={roadEdge}
                  cy={y}
                  r="5"
                  fill="#ff1800"
                  opacity="0.7"
                />
                {/* Lap marker on road */}
                <rect
                  x="440"
                  y={y - 8}
                  width="120"
                  height="16"
                  fill="#ffffff"
                  opacity="0.04"
                />
              </g>
            )
          })}
        </svg>

        {/* Loading state */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.3 }}
                  className="w-2 h-2 rounded-full bg-red-500"
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/40 text-sm tracking-wider" style={{ fontFamily: 'Barlow Condensed' }}>
              Unable to load posts · Check back soon
            </p>
          </div>
        )}

        {/* Post cards – alternating left / right */}
        {sortedPosts.map((post, i) => {
          const isLeft = i % 2 === 0
          const y = cardCenters[i]
          const yPct = (y / sectionH) * 100

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="absolute"
              style={{
                top: `${yPct}%`,
                left: isLeft ? '8%' : undefined,
                right: isLeft ? undefined : '8%',
                width: 'clamp(160px, 26%, 280px)',
                transform: 'translateY(-50%)',
                zIndex: 10,
              }}
            >
              {/* Card label */}
              <div
                className={`text-[9px] tracking-[0.4em] uppercase mb-1.5 flex items-center gap-1.5 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-3 h-px bg-red-600/60" />
                <span className="text-red-600/50" style={{ fontFamily: 'Barlow Condensed' }}>
                  Unit {i + 1}
                </span>
              </div>
              <PostCard post={post} onClick={() => setSelectedPost(post)} />
            </motion.div>
          )
        })}
      </div>

      {/* Bottom padding */}
      <div style={{ height: PAD_BOTTOM }} />

      {/* Modal */}
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  )
}

export default EducationSection