import { THRESHOLDS } from '@/lib/constants/thresholds'
import type { DetectedPattern } from '@/types/comparison'

interface Props {
  pattern: DetectedPattern
}

export default function PatternCard({ pattern }: Props) {
  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">{pattern.name}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{pattern.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(pattern.triggering_deltas).map(([key, delta]) => {
          const meta = THRESHOLDS.find((t) => t.key === key)
          return (
            <div key={key} className="bg-gray-50 rounded-lg px-3 py-1.5 text-xs flex items-center gap-1.5">
              <span className="font-mono text-gray-400">{meta?.abbr}</span>
              <span className="text-gray-700 font-medium">Δ{Math.round(delta)}</span>
            </div>
          )
        })}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Guidance</p>
        <p className="text-sm text-gray-600 leading-relaxed">{pattern.guidance}</p>
      </div>
    </div>
  )
}
