'use client'
import { useState } from 'react'
import type { SoloAnalysis } from '@/lib/types'

export function useAnalyzeSolo() {
  const [data, setData] = useState<SoloAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function analyze(text: string, inputMode: 'draft' | 'thread') {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'solo', text, inputMode }),
      })
      if (!res.ok) throw new Error('Request failed')
      const json = await res.json()
      setData(json)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setData(null)
    setError(null)
  }

  return { data, loading, error, analyze, reset }
}
