import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { THRESHOLDS, THRESHOLD_GROUPS } from '@/lib/constants/thresholds'
import ThresholdGroup from '@/components/profile/ThresholdGroup'
import type { ThresholdProfile } from '@/types/quiz'

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [{ data: profileRow }, { data: thresholdRow }] = await Promise.all([
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
