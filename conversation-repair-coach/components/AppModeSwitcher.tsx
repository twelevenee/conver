'use client'

interface Props {
  appMode: 'solo' | 'couples'
  onModeChange: (mode: 'solo' | 'couples') => void
}

export default function AppModeSwitcher({ appMode, onModeChange }: Props) {
  return (
    <div className="flex justify-center gap-2 mt-5 animate-fade-up" style={{ animationDelay: '0.45s', opacity: 0 }}>
      <button
        onClick={() => onModeChange('solo')}
        className={`px-5 py-2 rounded-full border-[1.5px] text-[0.85rem] transition-all duration-200 cursor-pointer ${
          appMode === 'solo'
            ? 'bg-charcoal border-charcoal text-white font-medium'
            : 'border-[#e0d9d0] text-mid hover:border-terracotta-light hover:text-terracotta'
        }`}
      >
        Solo mode
      </button>
      <button
        onClick={() => onModeChange('couples')}
        className={`px-5 py-2 rounded-full border-[1.5px] text-[0.85rem] transition-all duration-200 cursor-pointer ${
          appMode === 'couples'
            ? 'border-transparent text-white font-medium'
            : 'border-[#e0d9d0] text-mid hover:border-terracotta-light hover:text-terracotta'
        }`}
        style={
          appMode === 'couples'
            ? { background: 'linear-gradient(135deg, #5b8ec4 0%, #c45b7a 100%)' }
            : {}
        }
      >
        💞 Couples mode
      </button>
    </div>
  )
}
