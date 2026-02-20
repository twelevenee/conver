import AppModeSwitcher from './AppModeSwitcher'

interface Props {
  appMode: 'solo' | 'couples'
  onModeChange: (mode: 'solo' | 'couples') => void
}

export default function Header({ appMode, onModeChange }: Props) {
  return (
    <header className="text-center px-6 pt-12 pb-6">
      <p
        className="font-[family-name:var(--font-lora)] text-xs tracking-[0.25em] uppercase text-terracotta mb-2 animate-fade-up"
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        Conversation Repair Coach
      </p>
      <h1
        className="font-[family-name:var(--font-lora)] font-semibold leading-tight animate-fade-up"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', animationDelay: '0.2s', opacity: 0 }}
      >
        Say it with <em className="italic text-terracotta">care</em>
      </h1>
      <p
        className="text-mid text-[0.95rem] font-light max-w-[440px] mx-auto mt-3 leading-relaxed animate-fade-up"
        style={{ animationDelay: '0.35s', opacity: 0 }}
      >
        Paste your message or a thread. Get it rewritten with empathy, flagged for patterns that push people away.
      </p>
      <AppModeSwitcher appMode={appMode} onModeChange={onModeChange} />
    </header>
  )
}
