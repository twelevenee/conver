import type { Flag } from '@/lib/types'

interface Props {
  flags: Flag[]
}

export default function FlagsSection({ flags }: Props) {
  if (!flags?.length) {
    return (
      <div className="bg-[#f0faf4] border-[1.5px] border-[#b8e0c2] rounded-[14px] px-6 py-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-[#4caf7d] rounded-full" />
          <span className="text-[0.72rem] tracking-[0.15em] uppercase text-[#4caf7d] font-medium">
            No major patterns flagged
          </span>
        </div>
        <p className="text-[0.88rem] text-mid">
          Your language looks clean. The rewrites below will add warmth and clarity.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-warning-bg border-[1.5px] border-[#f0c99a] rounded-[14px] px-6 py-5 mb-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-warning rounded-full" />
        <span className="text-[0.72rem] tracking-[0.15em] uppercase text-warning font-medium">
          Patterns to watch
        </span>
      </div>
      {flags.map((f, i) => (
        <div
          key={i}
          className="bg-white rounded-lg px-[0.9rem] py-[0.65rem] mb-2 last:mb-0 text-[0.88rem] leading-[1.5] border-l-[3px] border-l-warning"
        >
          <p className="font-[family-name:var(--font-lora)] italic font-semibold text-charcoal">
            &ldquo;{f.phrase}&rdquo;
          </p>
          <p className="text-mid mt-0.5 text-[0.83rem]">{f.reason}</p>
        </div>
      ))}
    </div>
  )
}
