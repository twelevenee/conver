'use client'
import { useEffect, useRef } from 'react'
import FlagsSection from '@/components/ui/FlagsSection'
import NvcCard from '@/components/ui/NvcCard'
import RewriteCard from '@/components/ui/RewriteCard'
import type { SoloAnalysis } from '@/lib/types'

export default function SoloResults({ data }: { data: SoloAnalysis }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [data])

  return (
    <div ref={ref} className="animate-fade-up">
      <FlagsSection flags={data.flags} />
      {data.nvc && <NvcCard nvc={data.nvc} />}
      <p className="text-center text-light text-[0.8rem] tracking-[0.1em] my-5">— rewrites —</p>
      {data.rewrites?.map((r, i) => (
        <RewriteCard key={i} rewrite={r} index={i} />
      ))}
    </div>
  )
}
