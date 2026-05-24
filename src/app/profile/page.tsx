import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import NotificationBanner from '@/components/shared/NotificationBanner'

export const metadata: Metadata = {
  title: 'Your Profile',
  description: 'Your Threshold profile — 15 dimensions of relationship dynamics.',
}
import { THRESHOLDS, THRESHOLD_GROUPS } from '@/lib/constants/thresholds'
import ThresholdGroup from '@/components/profile/ThresholdGroup'
import type { ThresholdProfile } from '@/types/quiz'

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
      <div className="mb-10">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Threshold Profile</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          {profileRow?.display_name ?? 'Your Profile'}
        </h1>
        <p className="text-xs text-gray-400">Computed {computedDate}</p>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        {activePairing?.status === 'active' && (
          <Link
            href={`/compare/${activePairing.id}`}
            className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            View comparison →
          </Link>
        )}
        {activePairing?.status === 'accepted' && (
          <NotificationBanner pairingId={activePairing.id} />
        )}
        {activePairing?.status === 'pending' && (
          <Link
            href="/invite"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-sm text-gray-500 hover:border-gray-300 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            Waiting for partner to accept — manage invite →
          </Link>
        )}
        {!activePairing && (
          <Link
            href="/invite"
            className="inline-block px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
          >
            Invite a partner →
          </Link>
        )}
        <Link
          href="/settings"
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors ml-auto"
        >
          Settings
        </Link>
      </div>

      <div className="space-y-10">
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
