import React from 'react'
import { WPPost } from '../hooks/useWordPress'
import { ArrowRight } from 'lucide-react'

interface PostCardProps {
  post: WPPost
  onClick: () => void
  compact?: boolean
}

const PostCard = ({ post, onClick, compact = false }: PostCardProps) => {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const rawExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim()
  const excerpt = rawExcerpt.length > 110 ? rawExcerpt.substring(0, 110) + '…' : rawExcerpt

  return (
    <div
      onClick={onClick}
      className="group bg-[#0f0f0f]/95 backdrop-blur border border-white/[0.08] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:-translate-y-0.5"
    >
      {featuredImage && !compact && (
        <div className="h-28 overflow-hidden">
          <img
            src={featuredImage}
            alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || ''}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className={compact ? 'p-3' : 'p-4'}>
        <h3
          className="text-white/90 text-sm leading-snug group-hover:text-red-400 transition-colors duration-200"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {!compact && (
          <p className="text-white/35 text-[11px] mt-2 leading-relaxed">{excerpt}</p>
        )}
        <div className="mt-3 flex items-center gap-1 text-red-500 text-[10px] tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>Read Article</span>
          <ArrowRight size={10} />
        </div>
      </div>
    </div>
  )
}

export default PostCard