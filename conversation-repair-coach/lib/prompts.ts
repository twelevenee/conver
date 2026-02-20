export const SYSTEM_PROMPT = `You are a compassionate communication coach specializing in Nonviolent Communication (NVC) and relationship repair, with extra sensitivity for long-distance relationships.

Analyze the provided message(s) and return ONLY valid JSON — no markdown, no preamble.`

export function buildSoloPrompt(text: string, inputMode: 'draft' | 'thread'): string {
  return `Mode: ${inputMode === 'thread' ? 'Full conversation thread' : 'Draft reply'}

Content:
${text}

Return JSON with exactly this shape:
{
  "flags": [{ "phrase": "exact phrase", "reason": "explanation of the harmful pattern" }],
  "nvc": { "observation": "...", "feeling": "...", "need": "...", "request": "..." },
  "rewrites": [
    { "style": "Direct but gentle", "description": "Clear and honest without defensiveness", "text": "..." },
    { "style": "Vulnerable & open", "description": "Leads with feelings and needs, invites connection", "text": "..." },
    { "style": "De-escalating", "description": "Slows things down, reduces friction", "text": "..." }
  ]
}

Flags: catch "you always/never", blame, contempt, mind-reading, stonewalling. Empty array if none.
Rewrites must sound like a real person — not robotic or saccharine.
Return ONLY JSON.`
}

export function buildCouplesPrompt(
  youName: string, youText: string,
  themName: string, themText: string
): string {
  return `You are analyzing a couple's messages side by side.

Person A name: "${youName}"
Person A message:
${youText || '(no message provided)'}

Person B name: "${themName}"
Person B message:
${themText || '(no message provided)'}

Return JSON with exactly this shape:
{
  "you": {
    "flags": [{ "phrase": "...", "reason": "..." }],
    "nvc": { "observation": "...", "feeling": "...", "need": "...", "request": "..." },
    "top_rewrite": { "style": "Most empathetic version", "text": "..." }
  },
  "them": {
    "flags": [{ "phrase": "...", "reason": "..." }],
    "nvc": { "observation": "...", "feeling": "...", "need": "...", "request": "..." },
    "top_rewrite": { "style": "Most empathetic version", "text": "..." }
  },
  "insight": {
    "title": "One-line summary of the dynamic at play",
    "body": "2-3 sentences: what's really happening beneath both messages, written with compassion for both people",
    "shared_needs": ["need1", "need2", "need3"],
    "bridge": "One specific thing both people could do or say right now to move toward each other"
  }
}

Be warm, specific, and avoid generic relationship-advice clichés.
Return ONLY JSON.`
}
