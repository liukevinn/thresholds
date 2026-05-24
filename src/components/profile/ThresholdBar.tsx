'use client'

import { useEffect, useState } from 'react'
import { getDescriptor } from '@/lib/constants/thresholds'
import type { ThresholdMeta } from '@/lib/constants/thresholds'

interface Props {
  meta: ThresholdMeta
  score: number
}

export default function ThresholdBar({ meta, score }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const descriptor = getDescriptor(score)
  const pct = Math.round(score)

  return (
    <div className="py-3">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{meta.label}</span>
        <div className="flex items-baseline gap-2 shrink-0 ml-4">
          <span className="text-xs text-muted-foreground">{descriptor.label}</span>
          <span className="font-mono text-sm font-semibold text-foreground tabular-nums">{pct}</span>
        </div>
      </div>
      <div className="h-3 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{
            width: mounted ? `${pct}%` : '0%',
            transition: 'width 0.7s ease-out',
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{meta.description}</p>
    </div>
  )
}
