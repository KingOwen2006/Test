import React, { useState, useMemo, useRef } from 'react'
import { useWordPressPosts, WPPost } from '../hooks/useWordPress'
import PostCard from './PostCard'
import PostModal from './PostModal'
import { motion } from 'motion/react'

// ── Catmull-Rom spline through waypoints → SVG cubic bezier path ──────────────
function generateChicanePath(
  numPeaks: number,
  svgW: number,
  svgH: number
): string {
  if (numPeaks === 0) return `M ${svgW / 2} 0 L ${svgW / 2} ${svgH}`

  const cx = svgW / 2
  const leftX = svgW * 0.27
  const rightX = svgW * 0.73
  const segH = svgH / (numPeaks + 1)

  const pts: [number, number][] = [
    [cx, 0],
    ...Array.from({ length: numPeaks }, (_, i): [number, number] => [
      i % 2 === 0 ? rightX : leftX,
      segH * (i + 1),
    ]),
    [cx, svgH],
  ]

  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

const SVG_W = 1000
const CARD_SPACING = 420
const PAD_TOP = 60
const PAD_BOTTOM = 100
const NUM_CURVES = 3 // Fixed number of curves
const MAX_POSTS = 7 // Maximum posts to display

const ProjectsSection = ({ id }: { id: string }) => {
  const { posts, loading, error } = useWordPressPosts('kingowenblog.wordpress.com', MAX_POSTS)
  const [selectedPost, setSelectedPost] = useState<WPPost | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Limit posts to max 7 and sort alphabetically
  const displayPosts = posts
    .slice(0, MAX_POSTS)
    .sort((a, b) => a.title.rendered.localeCompare(b.title.rendered))
  const numPosts = displayPosts.length
  const sectionH = Math.max(800, numPosts * CARD_SPACING + PAD_TOP + PAD_BOTTOM)
  const svgH = sectionH

  const roadPath = useMemo(
    () => generateChicanePath(NUM_CURVES, SVG_W, svgH),
    [svgH]
  )

  // Distribute posts evenly from top to bottom in order
  const cardPositions = Array.from({ length: numPosts }, (_, i) => {
    // Calculate which curve peak this post is closest to
    const totalSegments = numPosts + 1
    const yPosition = PAD_TOP + (i * (sectionH - PAD_TOP - PAD_BOTTOM) / (numPosts - 1 || 1))
    const yPct = (yPosition / sectionH) * 100
    
    // Determine which side based on position along the curve
    const segH = svgH / (NUM_CURVES + 1)
    const curveIndex = Math.floor((yPosition / svgH) * (NUM_CURVES + 1))
    const isRight = curveIndex % 2 === 1
    
    return {
      yPct,
      isRight,
    }
  })

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ 
        background: '#1a4d1a',
        paddingBottom: PAD_BOTTOM 
      }}
    >
      {/* Section header */}
      <div className="relative z-10 pt-24 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-white tracking-[0.25em] uppercase"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 6vw, 4rem)',
            }}
          >
            Projects
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        </motion.div>
      </div>

      {/* Road section */}
      <div className="relative" style={{ height: sectionH }}>
        {/* SVG Road */}
        <svg
          viewBox={`0 0 ${SVG_W} ${svgH}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
        >
          {/* Outer glow / runway */}
          <path d={roadPath} fill="none" stroke="#1a1a1a" strokeWidth="180" strokeLinecap="round" />
          {/* Runoff / gravel traps – slight tint */}
          <path d={roadPath} fill="none" stroke="#111" strokeWidth="220" strokeLinecap="round" opacity="0.5" />
          {/* Road surface */}
          <path d={roadPath} fill="none" stroke="#1d1d1d" strokeWidth="140" strokeLinecap="round" />
          {/* Left edge line */}
          <path
            d={roadPath}
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="146"
            strokeLinecap="round"
            opacity="0.04"
          />
          {/* Right edge line (same trick — slightly wider border) */}
          <path
            d={roadPath}
            fill="none"
            stroke="#eaeaea"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0"
          />
          {/* Edge lines drawn as offset paths — approximate by adding/subtracting */}
          {/* Inner road border lines */}
          <path d={roadPath} fill="none" stroke="#444" strokeWidth="142" strokeLinecap="round" opacity="0.0" />
          {/* White edge markers */}
          <path d={roadPath} fill="none" stroke="#fff" strokeWidth="148" strokeLinecap="round" opacity="0.035" />
          {/* Center dashed line */}
          <path
            d={roadPath}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeDasharray="36 28"
            strokeLinecap="round"
            opacity="0.55"
          />
          {/* Connector lines from road to cards */}
          {cardPositions.map(({ yPct, isRight }, i) => {
            const y = (yPct / 100) * svgH
            const roadEdge = isRight ? SVG_W * 0.73 + 75 : SVG_W * 0.27 - 75
            const cardEdge = isRight ? SVG_W * 0.77 : SVG_W * 0.23
            return (
              <line
                key={i}
                x1={roadEdge}
                y1={y}
                x2={cardEdge}
                y2={y}
                stroke="#ff1800"
                strokeWidth="2"
                strokeDasharray="12 8"
                opacity="0.4"
              />
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

        {/* Post cards */}
        {displayPosts.map((post, i) => {
          const { yPct, isRight } = cardPositions[i]
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: isRight ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute"
              style={{
                top: `${yPct}%`,
                left: isRight ? '78%' : undefined,
                right: isRight ? undefined : '78%',
                width: 'clamp(180px, 20%, 280px)',
                transform: 'translateY(-50%)',
                zIndex: 10,
              }}
            >
              <PostCard post={post} onClick={() => setSelectedPost(post)} />
            </motion.div>
          )
        })}
      </div>

      {/* Modal */}
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  )
}

export default ProjectsSection