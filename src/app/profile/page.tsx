import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import NotificationBanner from '@/components/shared/NotificationBanner'
import { THRESHOLDS, THRESHOLD_GROUPS } from '@/lib/constants/thresholds'
import ThresholdGroup from '@/components/profile/ThresholdGroup'
import type { ThresholdProfile } from '@/types/quiz'

export const metadata: Metadata = {
  title: 'Your Profile',
  description: 'Your Threshold profile — 15 dimensions of relationship dynamics.',
}

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [{ data: profileRow }, { data: thresholdRow }, { data: activePairing }] = await Promise.all([
    supabase
      .from('profiles')
      .select('display_name, computed_at')
      .eq('id', user.id)
      .single(),
    supabase
      .from('threshold_profiles')
      .select('*')
      .eq('user_id', user.id)
      .order('profile_version', { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from('pairings')
      .select('id, status')
      .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`)
      .in('status', ['pending', 'accepted', 'active'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ])

  if (!thresholdRow) redirect('/quiz')

  const profile = thresholdRow as unknown as ThresholdProfile

  const computedDate = new Date(thresholdRow.computed_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-10">
        <p className="label-caps mb-2">Threshold Profile</p>
        <h1 className="heading text-3xl text-foreground mb-2">
          {profileRow?.display_name ?? 'your profile'}
        </h1>
        <p className="text-xs text-muted-foreground">computed {computedDate}</p>
      </div>

      {/* CTAs */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        {activePairing?.status === 'active' && (
          <Link
            href={`/compare/${activePairing.id}`}
            className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            view comparison →
          </Link>
        )}
        {activePairing?.status === 'accepted' && (
          <NotificationBanner pairingId={activePairing.id} />
        )}
        {activePairing?.status === 'pending' && (
          <Link
            href="/invite"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm text-muted-foreground hover:border-primary/50 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-warning shrink-0" />
            waiting for partner — manage invite →
          </Link>
        )}
        {!activePairing && (
          <Link
            href="/invite"
            className="inline-block px-4 py-2 border border-border text-sm font-medium text-foreground rounded-lg hover:border-primary/50 transition-colors"
          >
            invite a partner →
          </Link>
        )}
        <Link
          href="/settings"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
        >
          settings
        </Link>
      </div>

      {/* Threshold groups */}
      <div className="space-y-6">
        {THRESHOLD_GROUPS.map((group) => {
          const groupThresholds = THRESHOLDS.filter((t) => t.group === group)
          return (
            <ThresholdGroup
              key={group}
              group={group}
              thresholds={groupThresholds}
              profile={profile}
            />
          )
        })}
      </div>
    </main>
  )
}
