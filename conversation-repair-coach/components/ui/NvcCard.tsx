import type { NVC } from '@/lib/types'

export default function NvcCard({ nvc }: { nvc: NVC }) {
  const items = [
    { label: 'Observation', value: nvc.observation },
    { label: 'Feeling', value: nvc.feeling },
    { label: 'Need', value: nvc.need },
    { label: 'Request', value: nvc.request },
  ]

  return (
    <div className="bg-card rounded-[14px] px-6 py-6 mb-5 shadow-nvc border-t-[3px] border-t-purple">
      <p className="text-[0.7rem] tracking-[0.18em] uppercase text-purple font-medium mb-3">
        NVC Breakdown — what&apos;s really going on
      </p>
      <div className="grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">
        {items.map((item) => (
          <div key={item.label} className="bg-purple-bg rounded-lg px-[0.9rem] py-3">
            <p className="text-[0.7rem] tracking-[0.12em] uppercase text-purple font-medium mb-1">
              {item.label}
            </p>
            <p className="text-[0.88rem] text-charcoal leading-[1.5]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
