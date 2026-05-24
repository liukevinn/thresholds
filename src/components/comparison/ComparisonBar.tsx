'use client'

import { useEffect, useState } from 'react'
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

const zoneConfig: Record<Zone, { badge: string; gap: string; label: string }> = {
  alignment: { badge: 'bg-success/15 text-success',  gap: 'bg-success/10',  label: 'alignment' },
  awareness:  { badge: 'bg-warning/15 text-warning',  gap: 'bg-warning/10',  label: 'awareness'  },
  tension:    { badge: 'bg-tension/15 text-tension',  gap: 'bg-tension/10',  label: 'tension'    },
}

export default function ComparisonBar({ meta, scoreA, scoreB, zone, delta }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const cfg = zoneConfig[zone]
  const minPos = Math.min(scoreA, scoreB)
  const maxPos = Math.max(scoreA, scoreB)

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">{meta.label}</span>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>{cfg.label}</span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">Δ{Math.round(Math.abs(delta))}</span>
        </div>
      </div>

      {/* Desktop: single-axis range visualization */}
      <div className="hidden md:block">
        <div className="relative h-7 rounded-full bg-border mx-2">
          {/* Zone gap between min and max positions */}
          <div
            className={`absolute top-0 h-full rounded-full ${cfg.gap}`}
            style={{
              left: `${minPos}%`,
              width: `${maxPos - minPos}%`,
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.5s ease-out',
            }}
          />
          {/* User A dot — primary */}
          <div
            className="absolute w-8.5 h-8.5 rounded-full bg-primary border-2 border-card shadow-sm"
            style={{
              left: `${scoreA}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.1s',
            }}
          />
          {/* User B dot — info */}
          <div
            className="absolute w-8.5 h-8.5 rounded-full bg-info border-2 border-card shadow-sm"
            style={{
              left: `${scoreB}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.2s',
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground/50 tabular-nums">
          <span>0</span>
          <span>100</span>
        </div>
      </div>

      {/* Mobile: stacked bars */}
      <div className="md:hidden space-y-2">
        <div className="h-3 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{
              width: mounted ? `${Math.round(scoreA)}%` : '0%',
              transition: 'width 0.7s ease-out',
            }}
          />
        </div>
        <div className="h-3 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-info rounded-full"
            style={{
              width: mounted ? `${Math.round(scoreB)}%` : '0%',
              transition: 'width 0.7s ease-out 0.1s',
            }}
          />
        </div>
      </div>
    </div>
  )
}
