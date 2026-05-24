import type { ThresholdMeta } from '@/lib/constants/thresholds'
import type { Zone } from '@/types/comparison'

interface Props {
  meta: ThresholdMeta
  scoreA: number
  scoreB: number
  zone: Zone
  nameA: string
  nameB: string
  delta: number
}

const zoneStyles: Record<Zone, { badge: string; barB: string }> = {
  alignment: { badge: 'text-emerald-700 bg-emerald-50', barB: 'bg-emerald-500' },
  awareness: { badge: 'text-amber-700 bg-amber-50', barB: 'bg-amber-400' },
  tension:   { badge: 'text-red-700 bg-red-50',     barB: 'bg-red-500' },
}

export default function ComparisonBar({ meta, scoreA, scoreB, zone, nameA, nameB, delta }: Props) {
  const styles = zoneStyles[zone]
  const initial = (name: string) => name.charAt(0).toUpperCase()

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-400 w-7 shrink-0">{meta.abbr}</span>
          <span className="text-sm font-medium text-gray-900">{meta.label}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${styles.badge}`}>{zone}</span>
          <span className="text-xs text-gray-400 tabular-nums w-8 text-right">Δ{Math.round(delta)}</span>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400 w-5 shrink-0 text-right">{initial(nameA)}</span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 rounded-full" style={{ width: `${Math.round(scoreA)}%` }} />
          </div>
          <span className="text-xs text-gray-500 tabular-nums w-6 text-right">{Math.round(scoreA)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400 w-5 shrink-0 text-right">{initial(nameB)}</span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${styles.barB}`} style={{ width: `${Math.round(scoreB)}%` }} />
          </div>
          <span className="text-xs text-gray-500 tabular-nums w-6 text-right">{Math.round(scoreB)}</span>
        </div>
      </div>
    </div>
  )
}
