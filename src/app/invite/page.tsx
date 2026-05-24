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
  const [canShare, setCanShare] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

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

    const inviteCode = crypto.randomUUID().replace(/-/g, '').slice(0, 8)

    const { data, error: insertError } = await supabase
      .from('pairings')
      .insert({ user_a_id: user.id, invite_code: inviteCode })
      .select('id, invite_code, status, expires_at')
      .single()

    if (insertError) {
      setError('failed to generate invite link. please try again.')
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

  async function handleShare(link: string) {
    try {
      await navigator.share({ title: 'Threshold', url: link })
    } catch {
      // user dismissed share sheet
    }
  }

  if (loading) return (
    <main className="max-w-2xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-3 w-20 bg-muted rounded mb-3" />
      <div className="h-8 w-44 bg-muted rounded mb-2" />
      <div className="h-4 w-80 bg-muted rounded mb-8" />
      <div className="h-10 w-48 bg-muted rounded-lg" />
    </main>
  )

  if (!quizCompleted) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <p className="label-caps mb-2">Threshold</p>
        <h1 className="heading text-3xl text-foreground mb-3">invite a partner</h1>
        <p className="text-sm text-muted-foreground mb-6">
          you need to complete the quiz before you can invite someone to compare profiles.
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

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? (typeof window !== 'undefined' ? window.location.origin : '')
  const inviteLink = pairing ? `${appUrl}/invite/${pairing.invite_code}` : null

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <p className="label-caps mb-2">Threshold</p>
      <h1 className="heading text-3xl text-foreground mb-2">invite a partner</h1>
      <p className="text-sm text-muted-foreground mb-8">
        share this link with someone you&apos;d like to compare profiles with.
        they&apos;ll need to complete the quiz before the comparison is available.
      </p>

      {!pairing ? (
        <div>
          {error && <p className="text-sm text-tension mb-4">{error}</p>}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {generating ? 'generating...' : 'generate invite link'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-muted rounded-xl p-4">
            <p className="label-caps mb-2">your invite link</p>
            <p className="font-mono text-sm text-foreground break-all mb-4">{inviteLink}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(inviteLink!)}
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                {copied ? 'copied!' : 'copy link'}
              </button>
              {canShare && (
                <button
                  onClick={() => handleShare(inviteLink!)}
                  className="px-4 py-2 border border-border text-sm font-medium text-foreground rounded-lg hover:border-primary/50 transition-colors"
                >
                  share
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${
                pairing.status === 'accepted' || pairing.status === 'active'
                  ? 'bg-success'
                  : 'bg-warning'
              }`}
            />
            <p className="text-sm text-muted-foreground">
              {pairing.status === 'accepted' || pairing.status === 'active'
                ? 'partner has accepted — comparison coming soon'
                : 'waiting for your partner to accept'}
            </p>
          </div>

          <div className="pt-2">
            <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← back to profile
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
