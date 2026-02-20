'use client'
import { useRef, useState } from 'react'
import type { Rewrite } from '@/lib/types'

interface Props {
  rewrite: Rewrite
  index: number
}

export default function RewriteCard({ rewrite, index }: Props) {
  const [copied, setCopied] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)

  function handleCopy() {
    const text = textRef.current?.innerText?.trim() ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-card rounded-[16px] px-7 py-7 mb-5 shadow-card border-t-[3px] border-t-sage">
      <p className="text-[0.7rem] tracking-[0.18em] uppercase text-sage font-medium mb-2">
        Option {index + 1}
      </p>
      <h3 className="font-[family-name:var(--font-lora)] text-[1.05rem] text-charcoal mb-1">
        {rewrite.style}
      </h3>
      <p className="text-[0.8rem] text-light mb-4">{rewrite.description}</p>
      <div className="relative bg-[#f0f6f2] rounded-[10px] px-5 py-4 text-[0.91rem] leading-[1.7] text-charcoal whitespace-pre-wrap">
        <span ref={textRef}>{rewrite.text}</span>
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-3 bg-white border border-[#d8ece0] rounded-md px-2.5 py-1 text-[0.75rem] text-sage cursor-pointer transition-all duration-150 hover:bg-sage hover:text-white"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
