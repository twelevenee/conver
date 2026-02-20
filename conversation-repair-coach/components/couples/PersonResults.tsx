'use client'
import { useRef, useState } from 'react'
import type { PersonAnalysis } from '@/lib/types'

interface Props {
  person: PersonAnalysis
  name: string
  variant: 'you' | 'them'
}

export default function PersonResults({ person, name, variant }: Props) {
  const [copied, setCopied] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)
  const isYou = variant === 'you'

  function handleCopy() {
    const text = textRef.current?.innerText?.replace('Copy', '').replace('Copied!', '').trim() ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={`rounded-[14px] p-5 ${isYou ? 'bg-blue-bg border-[1.5px] border-[#c2d8ef]' : 'bg-pink-bg border-[1.5px] border-[#efcad8]'}`}>
      <div className={`flex items-center gap-2 mb-4 text-[0.8rem] font-medium tracking-[0.1em] uppercase ${isYou ? 'text-blue' : 'text-pink'}`}>
        <div className={`w-2 h-2 rounded-full ${isYou ? 'bg-blue' : 'bg-pink'}`} />
        {name}
      </div>

      {/* Mini flags */}
      {person.flags?.length ? (
        <div className="mb-3">
          {person.flags.map((f, i) => (
            <div key={i} className="bg-white rounded-md px-3 py-2 mb-1.5 last:mb-0 text-[0.8rem] border-l-2 border-l-warning text-mid">
              <strong className="italic text-charcoal font-[family-name:var(--font-lora)]">&ldquo;{f.phrase}&rdquo;</strong>
              <br />{f.reason}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-md px-3 py-2 mb-3 text-[0.8rem] border-l-2 border-l-[#4caf7d] text-[#4caf7d]">
          ✓ No harmful patterns flagged
        </div>
      )}

      {/* Mini NVC */}
      {person.nvc && (
        <div className="mb-3 space-y-1.5">
          {(['feeling', 'need', 'request'] as const).map((key) => (
            <div key={key} className="flex gap-2 items-start text-[0.83rem]">
              <span className={`text-[0.65rem] tracking-[0.1em] uppercase font-semibold pt-[2px] min-w-[72px] shrink-0 ${isYou ? 'text-blue' : 'text-pink'}`}>
                {key}
              </span>
              <span className="text-charcoal leading-[1.5]">{person.nvc[key]}</span>
            </div>
          ))}
        </div>
      )}

      {/* Top rewrite */}
      {person.top_rewrite && (
        <div className="mt-3">
          <p className="text-[0.68rem] tracking-[0.15em] uppercase text-sage font-medium mb-1.5">
            Suggested rewrite
          </p>
          <div className="relative bg-white rounded-[10px] px-4 py-3 text-[0.86rem] leading-[1.7] text-charcoal whitespace-pre-wrap">
            <div ref={textRef}>{person.top_rewrite.text}</div>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-white border border-[#d8ece0] rounded-md px-2 py-0.5 text-[0.72rem] text-sage cursor-pointer transition-all duration-150 hover:bg-sage hover:text-white"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
