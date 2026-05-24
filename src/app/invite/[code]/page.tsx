import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import AcceptButton from './AcceptButton'
import SaveInviteCode from './SaveInviteCode'

interface Props {
  params: Promise<{ code: string }>
}

export default async function InviteAcceptPage({ params }: Props) {
  const { code } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/auth/login?next=/invite/${code}`)

  const { data: rows, error } = await supabase.rpc('get_pairing_by_code', { p_code: code })

  if (error || !rows || rows.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <p className="label-caps mb-2">Threshold</p>
        <h1 className="heading text-3xl text-foreground mb-3">invite not found</h1>
        <p className="text-sm text-muted-foreground mb-6">
          this invite link is invalid or has expired.
        </p>
        <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← back to profile
        </Link>
      </main>
    )
  }

  const pairing = rows[0] as {
    id: string
    status: string
    expires_at: string
    user_a_id: string
    user_b_id: string | null
  }

  if (pairing.status !== 'pending' || pairing.user_b_id !== null) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <p className="label-caps mb-2">Threshold</p>
        <h1 className="heading text-3xl text-foreground mb-3">invite already used</h1>
        <p className="text-sm text-muted-foreground mb-6">
          this invite has already been accepted.
        </p>
        <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← back to profile
        </Link>
      </main>
    )
  }

  if (pairing.user_a_id === user.id) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <p className="label-caps mb-2">Threshold</p>
        <h1 className="heading text-3xl text-foreground mb-3">this is your invite</h1>
        <p className="text-sm text-muted-foreground mb-6">
          share this link with your partner — you can&apos;t accept your own invite.
        </p>
        <Link href="/invite" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← back to invite page
        </Link>
      </main>
    )
  }

  if (new Date(pairing.expires_at) < new Date()) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <p className="label-caps mb-2">Threshold</p>
        <h1 className="heading text-3xl text-foreground mb-3">invite expired</h1>
        <p className="text-sm text-muted-foreground mb-6">
          this invite link has expired. ask your partner to generate a new one.
        </p>
        <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← back to profile
        </Link>
      </main>
    )
  }

  const { data: myProfile } = await supabase
    .from('profiles')
    .select('quiz_completed')
    .eq('id', user.id)
    .single()

  if (!myProfile?.quiz_completed) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <SaveInviteCode code={code} />
        <p className="label-caps mb-2">Threshold</p>
        <h1 className="heading text-3xl text-foreground mb-3">you&apos;ve been invited</h1>
        <p className="text-sm text-muted-foreground mb-6">
          you need to complete the quiz before you can accept this invite and see your comparison.
        </p>
        <Link
          href="/quiz"
          className="inline-block px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          take the quiz
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <p className="label-caps mb-2">Threshold</p>
      <h1 className="heading text-3xl text-foreground mb-3">you&apos;ve been invited</h1>
      <p className="text-sm text-muted-foreground mb-8">
        someone has invited you to compare your threshold profiles.
        accept to link your profiles and unlock your compatibility analysis.
      </p>
      <AcceptButton inviteCode={code} />
    </main>
  )
}
