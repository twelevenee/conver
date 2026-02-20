export interface Flag {
  phrase: string
  reason: string
}

export interface NVC {
  observation: string
  feeling: string
  need: string
  request: string
}

export interface Rewrite {
  style: string
  description: string
  text: string
}

export interface TopRewrite {
  style: string
  text: string
}

export interface SoloAnalysis {
  flags: Flag[]
  nvc: NVC
  rewrites: Rewrite[]
}

export interface PersonAnalysis {
  flags: Flag[]
  nvc: NVC
  top_rewrite: TopRewrite
}

export interface CouplesInsight {
  title: string
  body: string
  shared_needs: string[]
  bridge: string
}

export interface CouplesAnalysis {
  you: PersonAnalysis
  them: PersonAnalysis
  insight: CouplesInsight
}

export interface SoloRequest {
  mode: 'solo'
  inputMode: 'draft' | 'thread'
  text: string
}

export interface CouplesRequest {
  mode: 'couples'
  youName: string
  themName: string
  youText: string
  themText: string
}

export type AnalyzeRequest = SoloRequest | CouplesRequest
