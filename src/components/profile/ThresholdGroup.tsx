import ThresholdBar from './ThresholdBar'
import type { ThresholdMeta } from '@/lib/constants/thresholds'
import type { ThresholdProfile } from '@/types/quiz'

interface Props {
  group: string
  thresholds: ThresholdMeta[]
  profile: ThresholdProfile
}

export default function ThresholdGroup({ group, thresholds, profile }: Props) {
  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100 mb-1">
        {group}
      </h2>
      <div className="divide-y divide-gray-50">
        {thresholds.map((t) => (
          <ThresholdBar key={t.key} meta={t} score={profile[t.key]} />
        ))}
      </div>
    </div>
  )
}
