import { THRESHOLDS } from '@/lib/constants/thresholds'
import type { HighlightItem } from '@/types/comparison'

interface Props {
  item: HighlightItem
  type: 'alignment' | 'tension'
  nameA: string
  nameB: string
}

export default function HighlightCard({ item, type, nameA, nameB }: Props) {
  const meta = THRESHOLDS.find((t) => t.key === item.threshold_key)!
  const borderColor = type === 'alignment' ? 'border-l-success' : 'border-l-tension'

  return (
    <div className={`bg-card rounded-xl border border-border border-l-4 ${borderColor} p-4`}>
      <div className="flex items-start justify-between mb-1.5">
        <span className="text-sm font-semibold text-foreground">{meta.label}</span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0 ml-4">
          Δ{Math.round(item.delta)}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{meta.description}</p>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>
          {nameA.split(' ')[0]}:{' '}
          <span className="font-semibold text-foreground">{Math.round(item.score_a)}</span>
        </span>
        <span>
          {nameB.split(' ')[0]}:{' '}
          <span className="font-semibold text-foreground">{Math.round(item.score_b)}</span>
        </span>
      </div>
    </div>
  )
}
