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
  { abbr: 'CONF', label: 'Confrontation Comfort', a: 72, b: 20, zone: 'tension' as const },
  { abbr: 'VULN', label: 'Vulnerability Readiness', a: 88, b: 83, zone: 'alignment' as const },
  { abbr: 'RECOV', label: 'Recovery Speed', a: 40, b: 68, zone: 'awareness' as const },
]

const zoneStyles = {
  alignment: { badge: 'text-emerald-700 bg-emerald-50', barB: 'bg-emerald-500' },
  awareness:  { badge: 'text-amber-700 bg-amber-50',   barB: 'bg-amber-400' },
  tension:    { badge: 'text-red-700 bg-red-50',        barB: 'bg-red-500' },
}

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">Threshold</p>

        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight leading-snug mb-4">
          Conflict doesn&apos;t come from incompatibility.
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-10">
          It comes from the gap between where two people&apos;s thresholds sit on the same quality.
          30 scenarios. 15 dimensions. One comparison that reframes how you understand each other.
        </p>

        <div className="border border-gray-100 rounded-2xl p-4 mb-10 space-y-0 divide-y divide-gray-50">
          {PREVIEW_BARS.map(({ abbr, label, a, b, zone }) => {
            const styles = zoneStyles[zone]
            const delta = Math.abs(a - b)
            return (
              <div key={abbr} className="py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400 w-9 shrink-0">{abbr}</span>
                    <span className="text-xs font-medium text-gray-800">{label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${styles.badge}`}>{zone}</span>
                    <span className="text-xs text-gray-400 tabular-nums w-6 text-right">Δ{delta}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400 w-4 shrink-0 text-right">A</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-900 rounded-full" style={{ width: `${a}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 tabular-nums w-5 text-right">{a}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400 w-4 shrink-0 text-right">B</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${styles.barB}`} style={{ width: `${b}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 tabular-nums w-5 text-right">{b}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Link
          href="/auth/signup"
          className="block w-full text-center px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
        >
          Take the quiz
        </Link>
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-gray-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
