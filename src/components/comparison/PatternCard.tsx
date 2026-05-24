import { THRESHOLDS } from '@/lib/constants/thresholds'
import type { DetectedPattern } from '@/types/comparison'

interface Props {
  pattern: DetectedPattern
}

export default function PatternCard({ pattern }: Props) {
  return (
    <div className="bg-card rounded-xl border border-border border-l-4 border-l-tension p-5">
      <h3 className="heading text-base mb-2">{pattern.name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pattern.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(pattern.triggering_deltas).map(([key, delta]) => {
          const meta = THRESHOLDS.find((t) => t.key === key)
          return (
            <div
              key={key}
              className="bg-accent-secondary rounded-full px-3 py-1 text-xs flex items-center gap-1.5"
            >
              <span className="font-mono text-muted-foreground">{meta?.abbr}</span>
              <span className="font-mono font-medium text-secondary-foreground">Δ{Math.round(delta)}</span>
            </div>
          )
        })}
      </div>

      <div className="bg-muted rounded-lg p-4">
        <p className="label-caps mb-2">what to try</p>
        <p className="text-sm text-foreground leading-relaxed">{pattern.guidance}</p>
      </div>
    </div>
  )
}
