import { getDescriptor } from '@/lib/constants/thresholds'
import type { ThresholdMeta } from '@/lib/constants/thresholds'

interface Props {
  meta: ThresholdMeta
  score: number
}

export default function ThresholdBar({ meta, score }: Props) {
  const descriptor = getDescriptor(score)
  const pct = Math.round(score)

  return (
    <div className="py-3">
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-mono text-gray-400 w-7 shrink-0">{meta.abbr}</span>
          <span className="text-sm font-medium text-gray-900">{meta.label}</span>
        </div>
        <div className="flex items-baseline gap-2 shrink-0 ml-4">
          <span className="text-xs text-gray-400">{descriptor.label}</span>
          <span className="text-sm font-semibold text-gray-900 tabular-nums w-6 text-right">{pct}</span>
        </div>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gray-900 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{meta.description}</p>
    </div>
  )
}
