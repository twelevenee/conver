'use client'
import { useState } from 'react'
import PersonInput from './PersonInput'

interface Props {
  onAnalyze: (youName: string, youText: string, themName: string, themText: string) => void
  loading: boolean
}

export default function CouplesPanel({ onAnalyze, loading }: Props) {
  const [youName, setYouName] = useState('You')
  const [themName, setThemName] = useState('Partner')
  const [youText, setYouText] = useState('')
  const [themText, setThemText] = useState('')

  function handleSubmit() {
    if ((!youText.trim() && !themText.trim()) || loading) return
    onAnalyze(
      youName.trim() || 'You',
      youText.trim(),
      themName.trim() || 'Partner',
      themText.trim()
    )
  }

  return (
    <div className="bg-card rounded-[16px] p-7 mb-5 shadow-card animate-fade-up" style={{ animationDelay: '0.55s', opacity: 0 }}>
      <p className="text-[0.7rem] tracking-[0.18em] uppercase text-light font-medium mb-4">
        Each person pastes their message
      </p>
      <div className="grid grid-cols-2 gap-4 max-[580px]:grid-cols-1">
        <PersonInput
          variant="you"
          name={youName}
          onNameChange={setYouName}
          text={youText}
          onTextChange={setYouText}
          placeholder="Paste your message or draft here..."
        />
        <PersonInput
          variant="them"
          name={themName}
          onNameChange={setThemName}
          text={themText}
          onTextChange={setThemText}
          placeholder="Paste their message here..."
        />
      </div>
      <p className="text-center text-[0.8rem] text-light italic font-[family-name:var(--font-lora)] mt-4">
        Both perspectives analyzed separately, then compared together.
      </p>
      <button
        onClick={handleSubmit}
        disabled={loading || (!youText.trim() && !themText.trim())}
        className="w-full py-4 mt-4 text-white rounded-xl font-[family-name:var(--font-lora)] text-base italic tracking-[0.02em] cursor-pointer transition-all duration-200 hover:-translate-y-px hover:brightness-105 active:translate-y-0 disabled:bg-light disabled:transform-none disabled:cursor-not-allowed"
        style={
          loading || (!youText.trim() && !themText.trim())
            ? {}
            : { background: 'linear-gradient(135deg, #5b8ec4 0%, #c45b7a 100%)' }
        }
      >
        {loading ? 'Analyzing both sides...' : '💞 Analyze both sides'}
      </button>
    </div>
  )
}
