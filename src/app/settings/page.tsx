import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import RetakeButton from './RetakeButton'

export const metadata: Metadata = {
  title: 'Settings',
}

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, quiz_completed')
    .eq('id', user.id)
    .single()

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Settings</p>
        <h1 className="text-2xl font-semibold text-gray-900">Account</h1>
      </div>

      <div className="space-y-6">
        <section className="border border-gray-100 rounded-xl p-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Your account</h2>
          <dl className="space-y-3">
            <div className="flex justify-between items-center">
              <dt className="text-sm text-gray-500">Name</dt>
              <dd className="text-sm font-medium text-gray-900">{profile?.display_name ?? '—'}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-sm text-gray-500">Email</dt>
              <dd className="text-sm font-medium text-gray-900">{user.email}</dd>
            </div>
          </dl>
        </section>

        {profile?.quiz_completed && (
          <section className="border border-gray-100 rounded-xl p-6">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Quiz</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Retaking the quiz generates a new threshold profile. If you have an active comparison,
              it will be recalculated automatically once both partners have current profiles.
            </p>
            <RetakeButton />
          </section>
        )}

        <div className="pt-2">
          <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
            ← Back to profile
          </Link>
        </div>
      </div>
    </main>
  )
}
