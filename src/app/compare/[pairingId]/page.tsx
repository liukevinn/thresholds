import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ComparisonGrid from '@/components/comparison/ComparisonGrid'
import HighlightCard from '@/components/comparison/HighlightCard'
import PatternCard from '@/components/comparison/PatternCard'
import CollapsibleThresholds from './CollapsibleThresholds'
import type { ThresholdProfile } from '@/types/quiz'
import type { ComparisonResult } from '@/types/comparison'

export const metadata: Metadata = {
  title: 'Comparison',
  description: 'Your Threshold comparison — side-by-side relationship dynamics analysis.',
}

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

  const nameA = profileRowA?.display_name ?? 'Partner A'
  const nameB = profileRowB?.display_name ?? 'Partner B'

  if (!comparison) {
    return (
      <main className="max-w-[960px] mx-auto px-4 py-12">
        <p className="label-caps mb-2">Threshold</p>
        <h1 className="heading text-3xl text-foreground mb-3">{nameA} & {nameB}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Both partners need to complete the quiz before the comparison can be generated.
        </p>
        <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to your profile
        </Link>
      </main>
    )
  }

  const profileA = thresholdA as unknown as ThresholdProfile
  const profileB = thresholdB as unknown as ThresholdProfile

  return (
    <main className="max-w-[960px] mx-auto px-4 py-12">

      {/* Header + legend */}
      <div className="mb-10">
        <p className="label-caps mb-2">Threshold</p>
        <h1 className="heading text-3xl text-foreground mb-6">{nameA} & {nameB}</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-foreground">{nameA}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-info" />
            <span className="text-sm text-foreground">{nameB}</span>
          </div>
        </div>
      </div>

      {/* Highlights: alignment + tension side by side */}
      <section className="mb-12">
        <h2 className="heading text-2xl text-foreground mb-6">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-base font-semibold text-success mb-3">Where you align</p>
            <div className="space-y-3">
              {comparison.alignment_highlights.map((item) => (
                <HighlightCard key={item.threshold_key} item={item} type="alignment" nameA={nameA} nameB={nameB} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-base font-semibold text-tension mb-3">Where you may clash</p>
            <div className="space-y-3">
              {comparison.tension_highlights.map((item) => (
                <HighlightCard key={item.threshold_key} item={item} type="tension" nameA={nameA} nameB={nameB} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detected patterns */}
      {comparison.detected_patterns.length > 0 && (
        <section className="mb-12">
          <h2 className="heading text-2xl text-foreground mb-6">Detected Patterns</h2>
          <div className="space-y-4">
            {comparison.detected_patterns.map((pattern) => (
              <PatternCard key={pattern.pattern_id} pattern={pattern} />
            ))}
          </div>
        </section>
      )}

      {/* Full breakdown — collapsible */}
      <section className="mb-12">
        <CollapsibleThresholds>
          <ComparisonGrid
            profileA={profileA}
            profileB={profileB}
            comparison={comparison}
            nameA={nameA}
            nameB={nameB}
          />
        </CollapsibleThresholds>
      </section>

      <div className="border-t border-border pt-6">
        <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to your profile
        </Link>
      </div>
    </main>
  )
}
