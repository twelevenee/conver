import type { CouplesInsight } from '@/lib/types'

export default function InsightCard({ insight }: { insight: CouplesInsight }) {
  return (
    <div
      className="border-[1.5px] border-[#e0cce8] rounded-[16px] px-7 py-6 mb-5"
      style={{ background: 'linear-gradient(135deg, #eef4fb 0%, #fdf0f4 100%)' }}
    >
      <p className="text-[0.7rem] tracking-[0.18em] uppercase font-medium text-[#8a6eb0] mb-3">
        💞 Couples Insight
      </p>
      <h3 className="font-[family-name:var(--font-lora)] text-[1.05rem] text-charcoal mb-3">
        {insight.title}
      </h3>
      <p className="text-[0.9rem] text-mid leading-[1.7]">{insight.body}</p>

      {insight.shared_needs?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {insight.shared_needs.map((need) => (
            <span
              key={need}
              className="bg-white border border-[#d4c0e8] rounded-full px-3 py-1 text-[0.8rem] text-[#8a6eb0]"
            >
              {need}
            </span>
          ))}
        </div>
      )}

      {insight.bridge && (
        <div className="mt-4 px-[1.1rem] py-[0.9rem] bg-white rounded-[10px] border-l-[3px] border-l-[#c4a0d8]">
          <p className="text-[0.7rem] tracking-[0.15em] uppercase text-[#8a6eb0] font-medium mb-1.5">
            One thing to try
          </p>
          <p className="text-[0.9rem] text-charcoal leading-[1.6]">{insight.bridge}</p>
        </div>
      )}
    </div>
  )
}
