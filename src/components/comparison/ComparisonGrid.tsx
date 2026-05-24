import ComparisonBar from './ComparisonBar'
import { THRESHOLDS, THRESHOLD_GROUPS } from '@/lib/constants/thresholds'
import type { ComparisonResult } from '@/types/comparison'
import type { ThresholdProfile } from '@/types/quiz'

interface Props {
  profileA: ThresholdProfile
  profileB: ThresholdProfile
  comparison: ComparisonResult
  nameA: string
  nameB: string
}

export default function ComparisonGrid({ profileA, profileB, comparison, nameA, nameB }: Props) {
  return (
    <div className="space-y-6">
      {THRESHOLD_GROUPS.map((group) => {
        const groupThresholds = THRESHOLDS.filter((t) => t.group === group)
        return (
          <div key={group} className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-base font-bold text-foreground tracking-wide">{group}</p>
            </div>
            <div className="px-4 divide-y divide-border">
              {groupThresholds.map((t) => (
                <ComparisonBar
                  key={t.key}
                  meta={t}
                  scoreA={profileA[t.key]}
                  scoreB={profileB[t.key]}
                  zone={comparison.zone_classifications[t.key]}
                  nameA={nameA}
                  nameB={nameB}
                  delta={comparison.deltas[t.key]}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
