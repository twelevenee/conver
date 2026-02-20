'use client'
import { useState } from 'react'

interface Props {
  onAnalyze: (text: string, inputMode: 'draft' | 'thread') => void
  loading: boolean
}

export default function SoloPanel({ onAnalyze, loading }: Props) {
  const [inputMode, setInputMode] = useState<'draft' | 'thread'>('draft')
  const [text, setText] = useState('')

  const placeholder = inputMode === 'draft'
    ? "e.g. 'You always shut down when I try to talk about this. It\u2019s like you don\u2019t even care anymore...'"
    : 'Paste the full thread here, including both sides...'

  function handleSubmit() {
    if (!text.trim() || loading) return
    onAnalyze(text.trim(), inputMode)
  }

  return (
    <div className="bg-card rounded-[16px] p-7 mb-5 shadow-card animate-fade-up" style={{ animationDelay: '0.55s', opacity: 0 }}>
      <p className="text-[0.7rem] tracking-[0.18em] uppercase text-light font-medium mb-3">
        What are you pasting?
      </p>
      <div className="flex gap-2 mb-4 flex-wrap">
        {(['draft', 'thread'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setInputMode(m)}
            className={`px-4 py-[0.45rem] rounded-full border-[1.5px] text-[0.82rem] transition-all duration-200 cursor-pointer ${
              inputMode === m
                ? 'bg-terracotta border-terracotta text-white font-medium'
                : 'border-[#e8e2d9] text-mid hover:border-terracotta-light hover:text-terracotta'
            }`}
          >
            {m === 'draft' ? 'My draft reply' : 'Full thread'}
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        rows={6}
        className="w-full border-[1.5px] border-[#e8e2d9] rounded-[10px] px-[1.1rem] py-4 text-[0.92rem] leading-[1.65] text-charcoal bg-warm-white resize-y min-h-[120px] outline-none transition-all duration-200 placeholder:text-light focus:border-terracotta-light focus:shadow-[0_0_0_3px_rgba(196,105,79,0.1)]"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      />
      <p className="text-center text-[0.8rem] text-light italic font-[family-name:var(--font-lora)] mt-2">
        Be honest — this is just between you and the app.
      </p>
      <button
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
        className="w-full py-4 mt-4 bg-terracotta text-white rounded-xl font-[family-name:var(--font-lora)] text-base italic tracking-[0.02em] cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(196,105,79,0.3)] hover:brightness-105 active:translate-y-0 disabled:bg-light disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed"
      >
        {loading ? 'Reading between the lines...' : '✦ Help me say this better'}
      </button>
    </div>
  )
}
