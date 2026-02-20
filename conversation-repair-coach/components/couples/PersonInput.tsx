'use client'

interface Props {
  variant: 'you' | 'them'
  name: string
  onNameChange: (v: string) => void
  text: string
  onTextChange: (v: string) => void
  placeholder: string
}

const styles = {
  you: {
    panel: 'bg-blue-bg border-2 border-[#c2d8ef]',
    dot: 'bg-blue',
    textareaFocus: 'focus:border-blue focus:shadow-[0_0_0_3px_rgba(91,142,196,0.12)]',
  },
  them: {
    panel: 'bg-pink-bg border-2 border-[#efcad8]',
    dot: 'bg-pink',
    textareaFocus: 'focus:border-pink focus:shadow-[0_0_0_3px_rgba(196,91,122,0.12)]',
  },
}

export default function PersonInput({ variant, name, onNameChange, text, onTextChange, placeholder }: Props) {
  const s = styles[variant]
  return (
    <div className={`${s.panel} rounded-[14px] p-5 transition-all duration-200`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.dot}`} />
        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="border-none bg-transparent text-[0.85rem] font-medium text-charcoal w-full outline-none border-b border-dashed border-[#ccc] pb-0.5"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        />
      </div>
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={`w-full bg-white border-[1.5px] border-transparent rounded-[10px] px-4 py-3 text-[0.92rem] leading-[1.65] text-charcoal min-h-[100px] resize-y outline-none transition-all duration-200 placeholder:text-light ${s.textareaFocus}`}
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      />
    </div>
  )
}
