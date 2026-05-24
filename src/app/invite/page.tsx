'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Pairing {
  id: string
  invite_code: string
  status: string
  expires_at: string
}

export default function InvitePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [pairing, setPairing] = useState<Pairing | null>(null)
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const [{ data: profile }, { data: pairings }] = await Promise.all([
        supabase.from('profiles').select('quiz_completed').eq('id', user.id).single(),
        supabase
          .from('pairings')
          .select('id, invite_code, status, expires_at')
          .eq('user_a_id', user.id)
          .in('status', ['pending', 'accepted', 'active'])
          .order('created_at', { ascending: false })
          .limit(1),
      ])

      setQuizCompleted(profile?.quiz_completed ?? false)
      setPairing(pairings?.[0] ?? null)
      setLoading(false)
    }
    load()
  }, [router])

  async function handleGenerate() {
    setGenerating(true)
    setError(null)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const inviteCode = crypto.randomUUID().replace(/-/g, '').slice(0, 12)

    const { data, error: insertError } = await supabase
      .from('pairings')
      .insert({ user_a_id: user.id, invite_code: inviteCode })
      .select('id, invite_code, status, expires_at')
      .single()

    if (insertError) {
      setError('Failed to generate invite link. Please try again.')
      setGenerating(false)
      return
    }

    setPairing(data)
    setGenerating(false)
  }

  async function handleCopy(link: string) {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <main className="max-w-2xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-3 w-20 bg-gray-100 rounded mb-3" />
      <div className="h-7 w-44 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-80 bg-gray-100 rounded mb-8" />
      <div className="h-10 w-48 bg-gray-100 rounded-lg" />
    </main>
  )

  if (!quizCompleted) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Threshold</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Invite a partner</h1>
        <p className="text-sm text-gray-500 mb-6">
          You need to complete the quiz before you can invite someone to compare profiles.
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

  const inviteLink = pairing
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/invite/${pairing.invite_code}`
    : null

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Threshold</p>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Invite a partner</h1>
      <p className="text-sm text-gray-500 mb-8">
        Share this link with someone you&apos;d like to compare profiles with.
        They&apos;ll need to complete the quiz before the comparison is available.
      </p>

      {!pairing ? (
        <div>
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {generating ? 'Generating...' : 'Generate invite link'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-2">Your invite link</p>
            <p className="text-sm text-gray-900 font-mono break-all mb-3">{inviteLink}</p>
            <button
              onClick={() => handleCopy(inviteLink!)}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                pairing.status === 'accepted' || pairing.status === 'active'
                  ? 'bg-green-500'
                  : 'bg-yellow-400'
              }`}
            />
            <p className="text-sm text-gray-500">
              {pairing.status === 'accepted' || pairing.status === 'active'
                ? 'Partner has accepted — comparison coming soon'
                : 'Waiting for your partner to accept'}
            </p>
          </div>

          <div className="pt-2">
            <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
              ← Back to profile
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
