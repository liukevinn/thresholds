import { THRESHOLDS } from '@/lib/constants/thresholds'
import type { HighlightItem, Zone } from '@/types/comparison'

interface Props {
  item: HighlightItem
  type: 'alignment' | 'tension'
  nameA: string
  nameB: string
}

const zoneStyles: Record<Zone, string> = {
  alignment: 'border-emerald-100',
  awareness: 'border-amber-100',
  tension:   'border-red-100',
}

export default function HighlightCard({ item, nameA, nameB }: Props) {
  const meta = THRESHOLDS.find((t) => t.key === item.threshold_key)!

  return (
    <div className={`border rounded-xl p-4 ${zoneStyles[item.zone]}`}>
      <div className="flex items-start justify-between mb-1.5">
        <div>
          <span className="text-xs font-mono text-gray-400 mr-2">{meta.abbr}</span>
          <span className="text-sm font-semibold text-gray-900">{meta.label}</span>
        </div>
        <span className="text-xs tabular-nums text-gray-400 shrink-0 ml-4">Δ{Math.round(item.delta)}</span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed mb-3">{meta.description}</p>
      <div className="flex gap-4 text-xs text-gray-500">
        <span>
          {nameA.split(' ')[0]}:{' '}
          <span className="font-semibold text-gray-900">{Math.round(item.score_a)}</span>
        </span>
        <span>
          {nameB.split(' ')[0]}:{' '}
          <span className="font-semibold text-gray-900">{Math.round(item.score_b)}</span>
        </span>
      </div>
    </div>
  )
}
