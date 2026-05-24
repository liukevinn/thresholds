'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Props {
  inviteCode: string
}

export default function AcceptButton({ inviteCode }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAccept() {
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error: rpcError } = await supabase.rpc('accept_pairing', {
      p_invite_code: inviteCode,
    })

    if (rpcError || data?.error) {
      const msg = data?.error === 'already_used'
        ? 'this invite has already been accepted.'
        : data?.error === 'own_invite'
        ? 'you cannot accept your own invite.'
        : data?.error === 'expired'
        ? 'this invite has expired.'
        : 'failed to accept invite. please try again.'
      setError(msg)
      setLoading(false)
      return
    }

    const pairingId = data?.pairing_id
    router.push(pairingId ? `/compare/${pairingId}` : '/profile')
  }

  return (
    <div>
      {error && <p className="text-sm text-tension mb-4">{error}</p>}
      <button
        onClick={handleAccept}
        disabled={loading}
        className="w-full py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'accepting...' : 'accept invite'}
      </button>
    </div>
  )
}
