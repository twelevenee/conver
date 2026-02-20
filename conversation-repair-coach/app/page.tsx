'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import SoloPanel from '@/components/solo/SoloPanel'
import SoloResults from '@/components/solo/SoloResults'
import CouplesPanel from '@/components/couples/CouplesPanel'
import CouplesResults from '@/components/couples/CouplesResults'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useAnalyzeSolo } from '@/hooks/useAnalyzeSolo'
import { useAnalyzeCouples } from '@/hooks/useAnalyzeCouples'

export default function Home() {
  const [appMode, setAppMode] = useState<'solo' | 'couples'>('solo')
  const [couplesNames, setCouplesNames] = useState({ you: 'You', them: 'Partner' })

  const solo = useAnalyzeSolo()
  const couples = useAnalyzeCouples()

  function handleAppModeChange(mode: 'solo' | 'couples') {
    setAppMode(mode)
    solo.reset?.()
    couples.reset?.()
  }

  function handleCouplesAnalyze(youName: string, youText: string, themName: string, themText: string) {
    setCouplesNames({ you: youName, them: themName })
    couples.analyze(youName, youText, themName, themText)
  }

  return (
    <>
      <Header appMode={appMode} onModeChange={handleAppModeChange} />
      <main className="max-w-[760px] mx-auto px-6 pb-20 pt-1">
        {appMode === 'solo' && (
          <>
            <SoloPanel onAnalyze={solo.analyze} loading={solo.loading} />
            {solo.loading && <LoadingSpinner text="Analyzing your words" />}
            {solo.error && <ErrorMessage message={solo.error} />}
            {solo.data && <SoloResults data={solo.data} />}
          </>
        )}
        {appMode === 'couples' && (
          <>
            <CouplesPanel onAnalyze={handleCouplesAnalyze} loading={couples.loading} />
            {couples.loading && <LoadingSpinner text="Reading between the lines for both of you" />}
            {couples.error && <ErrorMessage message={couples.error} />}
            {couples.data && (
              <CouplesResults
                data={couples.data}
                youName={couplesNames.you}
                themName={couplesNames.them}
              />
            )}
          </>
        )}
      </main>
    </>
  )
}
