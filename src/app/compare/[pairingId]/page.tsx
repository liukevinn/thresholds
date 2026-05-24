import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Comparison',
  description: 'Your Threshold comparison — side-by-side relationship dynamics analysis.',
}
import ComparisonGrid from '@/components/comparison/ComparisonGrid'
import HighlightCard from '@/components/comparison/HighlightCard'
import PatternCard from '@/components/comparison/PatternCard'
import type { ThresholdProfile } from '@/types/quiz'
import type { ComparisonResult } from '@/types/comparison'

interface Props {
  params: Promise<{ pairingId: string }>
}

export default async function ComparePage({ params }: Props) {
  const { pairingId } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: pairing } = await supabase
    .from('pairings')
    .select('*')
    .eq('id', pairingId)
    .single()

  if (!pairing || (pairing.user_a_id !== user.id && pairing.user_b_id !== user.id)) {
    redirect('/profile')
  }

  const [
    { data: profileRowA },
    { data: profileRowB },
    { data: thresholdA },
    { data: thresholdB },
    { data: existingComparison },
  ] = await Promise.all([
    supabase.from('profiles').select('display_name').eq('id', pairing.user_a_id).single(),
    supabase.from('profiles').select('display_name').eq('id', pairing.user_b_id).single(),
    supabase.from('threshold_profiles').select('*').eq('user_id', pairing.user_a_id).order('profile_version', { ascending: false }).limit(1).single(),
    supabase.from('threshold_profiles').select('*').eq('user_id', pairing.user_b_id).order('profile_version', { ascending: false }).limit(1).single(),
    supabase.from('comparison_results').select('*').eq('pairing_id', pairingId).maybeSingle(),
  ])

  let comparison: ComparisonResult | null = existingComparison as ComparisonResult | null

  // Recompute if either profile was updated after the last comparison (retake scenario)
  const profilesNewerThanComparison =
    existingComparison && thresholdA && thresholdB && (
      new Date((thresholdA as { computed_at: string }).computed_at) > new Date(existingComparison.computed_at) ||
      new Date((thresholdB as { computed_at: string }).computed_at) > new Date(existingComparison.computed_at)
    )

  if ((!comparison || profilesNewerThanComparison) && thresholdA && thresholdB) {
    const { data: fnData } = await supabase.functions.invoke('compute-comparison', {
      body: { pairing_id: pairingId },
    })
    comparison = fnData?.comparison ?? null
  }

  if (!comparison) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Comparison not ready</h1>
        <p className="text-sm text-gray-500 mb-6">
          Both partners need to complete the quiz before the comparison can be generated.
        </p>
        <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
          ← Back to profile
        </Link>
      </main>
    )
  }

  const nameA = profileRowA?.display_name ?? 'Partner A'
  const nameB = profileRowB?.display_name ?? 'Partner B'
  const profileA = thresholdA as unknown as ThresholdProfile
  const profileB = thresholdB as unknown as ThresholdProfile

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Threshold Comparison</p>
        <h1 className="text-2xl font-semibold text-gray-900">{nameA} & {nameB}</h1>
      </div>

      <section className="mb-12">
        <ComparisonGrid
          profileA={profileA}
          profileB={profileB}
          comparison={comparison}
          nameA={nameA}
          nameB={nameB}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Alignment</h2>
        <div className="space-y-3">
          {comparison.alignment_highlights.map((item) => (
            <HighlightCard key={item.threshold_key} item={item} type="alignment" nameA={nameA} nameB={nameB} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Friction Points</h2>
        <div className="space-y-3">
          {comparison.tension_highlights.map((item) => (
            <HighlightCard key={item.threshold_key} item={item} type="tension" nameA={nameA} nameB={nameB} />
          ))}
        </div>
      </section>

      {comparison.detected_patterns.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Detected Patterns</h2>
          <div className="space-y-4">
            {comparison.detected_patterns.map((pattern) => (
              <PatternCard key={pattern.pattern_id} pattern={pattern} />
            ))}
          </div>
        </section>
      )}

      <div className="pt-4 border-t border-gray-100">
        <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
          ← Back to your profile
        </Link>
      </div>
    </main>
  )
}
