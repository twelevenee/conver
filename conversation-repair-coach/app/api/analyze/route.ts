import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT, buildSoloPrompt, buildCouplesPrompt } from '@/lib/prompts'
import type { AnalyzeRequest } from '@/lib/types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  let body: AnalyzeRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  let userPrompt: string
  if (body.mode === 'solo') {
    if (!body.text?.trim()) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }
    userPrompt = buildSoloPrompt(body.text, body.inputMode)
  } else if (body.mode === 'couples') {
    if (!body.youText?.trim() && !body.themText?.trim()) {
      return NextResponse.json({ error: 'At least one message is required' }, { status: 400 })
    }
    userPrompt = buildCouplesPrompt(body.youName, body.youText, body.themName, body.themText)
  } else {
    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const raw = message.content
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('')

    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())
    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Anthropic API error:', err)
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    )
  }
}
