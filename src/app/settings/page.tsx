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
        <p className="label-caps mb-2">Threshold</p>
        <h1 className="heading text-3xl text-foreground">settings</h1>
      </div>

      <div className="space-y-4">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-base font-bold text-foreground tracking-wide">your account</h2>
          </div>
          <dl className="divide-y divide-border">
            <div className="flex justify-between items-center px-5 py-3">
              <dt className="text-sm text-muted-foreground">name</dt>
              <dd className="text-sm font-medium text-foreground">{profile?.display_name ?? '—'}</dd>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <dt className="text-sm text-muted-foreground">email</dt>
              <dd className="text-sm font-medium text-foreground">{user.email}</dd>
            </div>
          </dl>
        </div>

        {profile?.quiz_completed && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground tracking-wide">quiz</h2>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                retaking the quiz generates a new threshold profile. if you have an active comparison,
                it will be recalculated automatically once both partners have current profiles.
              </p>
              <RetakeButton />
            </div>
          </div>
        )}

        <div className="pt-2">
          <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← back to profile
          </Link>
        </div>
      </div>
    </main>
  )
}
