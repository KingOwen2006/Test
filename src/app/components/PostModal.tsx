import React, { useEffect } from 'react'
import { X, Calendar, ExternalLink } from 'lucide-react'
import { WPPost } from '../hooks/useWordPress'
import { motion, AnimatePresence } from 'motion/react'

interface PostModalProps {
  post: WPPost | null
  onClose: () => void
}

const PostModal = ({ post, onClose }: PostModalProps) => {
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [post])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative bg-[#0d0d0d] border border-white/10 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Red top stripe */}
            <div className="h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700 rounded-t-xl" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all"
            >
              <X size={16} />
            </button>

            {/* Featured image */}
            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
              <div className="h-56 sm:h-72 overflow-hidden">
                <img
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post._embedded['wp:featuredmedia'][0].alt_text || ''}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={12} className="text-red-500" />
                <span className="text-red-500 text-xs font-mono tracking-widest uppercase">
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
              </div>

              <h2
                className="text-white text-2xl sm:text-3xl leading-tight mb-8"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              <div
                className="wp-content text-white/65 leading-relaxed text-sm sm:text-base"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />

              {post.link && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 text-red-500 hover:text-red-400 text-xs tracking-widest uppercase transition-colors"
                >
                  <span>View on WordPress</span>
                  <ExternalLink size={11} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PostModal