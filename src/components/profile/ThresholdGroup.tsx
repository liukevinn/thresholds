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
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-base font-bold text-foreground tracking-wide">{group}</h2>
      </div>
      <div className="px-4 divide-y divide-border">
        {thresholds.map((t) => (
          <ThresholdBar key={t.key} meta={t} score={profile[t.key]} />
        ))}
      </div>
    </div>
  )
}
