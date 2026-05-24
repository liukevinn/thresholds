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
    <div className="space-y-10">
      {THRESHOLD_GROUPS.map((group) => {
        const groupThresholds = THRESHOLDS.filter((t) => t.group === group)
        return (
          <div key={group}>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100 mb-1">
              {group}
            </h2>
            <div className="divide-y divide-gray-50">
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
