import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Threshold — Relationship Dynamics Assessment',
  description: 'Conflict doesn\'t come from incompatibility. It comes from the gap between where two people\'s thresholds sit on the same quality. 30 scenarios. 15 dimensions.',
  openGraph: {
    title: 'Threshold — Relationship Dynamics Assessment',
    description: 'Understand why you and your partner interact the way you do.',
    type: 'website',
  },
}

const PREVIEW_BARS = [
  { label: 'Confrontation Comfort', a: 72, b: 20, zone: 'tension'   as const },
  { label: 'Vulnerability Readiness', a: 88, b: 83, zone: 'alignment' as const },
  { label: 'Recovery Speed',          a: 40, b: 68, zone: 'awareness' as const },
]

const zoneConfig = {
  alignment: { badge: 'bg-success/15 text-success',  gap: 'bg-success/10',  label: 'alignment' },
  awareness:  { badge: 'bg-warning/15 text-warning',  gap: 'bg-warning/10',  label: 'awareness'  },
  tension:    { badge: 'bg-tension/15 text-tension',  gap: 'bg-tension/10',  label: 'tension'    },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-5xl">

        {/* Two-column on desktop, single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left: copy + CTA */}
          <div>
            <p className="label-caps mb-6">Threshold</p>
            <h1 className="heading text-3xl text-foreground leading-snug mb-4">
              conflict doesn&apos;t come from incompatibility.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-10">
              it comes from the gap between where two people&apos;s thresholds sit on the same quality.
              30 scenarios. 15 dimensions. one comparison that reframes how you understand each other.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block w-full md:w-auto text-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors"
            >
              take the quiz
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              already have an account?{' '}
              <Link href="/auth/login" className="text-foreground hover:underline">
                sign in
              </Link>
            </p>
          </div>

          {/* Right: preview widget */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-5 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">you</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-info" />
                <span className="text-xs text-muted-foreground">partner</span>
              </div>
            </div>

            <div className="divide-y divide-border">
              {PREVIEW_BARS.map(({ label, a, b, zone }) => {
                const cfg = zoneConfig[zone]
                const minPos = Math.min(a, b)
                const maxPos = Math.max(a, b)
                const delta = Math.abs(a - b)
                return (
                  <div key={label} className="py-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-foreground">{label}</span>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>{cfg.label}</span>
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">Δ{delta}</span>
                      </div>
                    </div>
                    <div className="relative h-3 rounded-full bg-border mx-2">
                      <div
                        className={`absolute top-0 h-full rounded-full ${cfg.gap}`}
                        style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
                      />
                      <div
                        className="absolute w-5 h-5 rounded-full bg-primary border-2 border-card shadow-sm"
                        style={{ left: `${a}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
                      />
                      <div
                        className="absolute w-5 h-5 rounded-full bg-info border-2 border-card shadow-sm"
                        style={{ left: `${b}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
