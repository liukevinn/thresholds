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
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Invite not found</h1>
        <p className="text-sm text-gray-500 mb-6">
          This invite link is invalid or has expired.
        </p>
        <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
          ← Back to profile
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
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Invite already used</h1>
        <p className="text-sm text-gray-500 mb-6">
          This invite has already been accepted.
        </p>
        <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
          ← Back to profile
        </Link>
      </main>
    )
  }

  if (pairing.user_a_id === user.id) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">This is your invite</h1>
        <p className="text-sm text-gray-500 mb-6">
          Share this link with your partner — you can&apos;t accept your own invite.
        </p>
        <Link href="/invite" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
          ← Back to invite page
        </Link>
      </main>
    )
  }

  if (new Date(pairing.expires_at) < new Date()) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Invite expired</h1>
        <p className="text-sm text-gray-500 mb-6">
          This invite link has expired. Ask your partner to generate a new one.
        </p>
        <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
          ← Back to profile
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
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Threshold</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">You&apos;ve been invited</h1>
        <p className="text-sm text-gray-500 mb-6">
          You need to complete the quiz before you can accept this invite and see your comparison.
        </p>
        <Link
          href="/quiz"
          className="inline-block px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          Take the quiz
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Threshold</p>
      <h1 className="text-2xl font-semibold text-gray-900 mb-3">You&apos;ve been invited</h1>
      <p className="text-sm text-gray-500 mb-8">
        Someone has invited you to compare your Threshold profiles.
        Accept to link your profiles and unlock your compatibility analysis.
      </p>
      <AcceptButton inviteCode={code} />
    </main>
  )
}
