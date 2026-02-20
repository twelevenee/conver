'use client'
import { useEffect, useRef } from 'react'
import PersonResults from './PersonResults'
import InsightCard from './InsightCard'
import type { CouplesAnalysis } from '@/lib/types'

interface Props {
  data: CouplesAnalysis
  youName: string
  themName: string
}

export default function CouplesResults({ data, youName, themName }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [data])

  return (
    <div ref={ref} className="animate-fade-up">
      <div className="grid grid-cols-2 gap-5 mb-5 max-[600px]:grid-cols-1">
        {data.you && <PersonResults person={data.you} name={youName} variant="you" />}
        {data.them && <PersonResults person={data.them} name={themName} variant="them" />}
      </div>
      {data.insight && <InsightCard insight={data.insight} />}
    </div>
  )
}
