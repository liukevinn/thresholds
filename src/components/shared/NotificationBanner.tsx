'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Props {
  pairingId: string
}

export default function NotificationBanner({ pairingId }: Props) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    // Check if comparison already exists (User B may have visited /compare before User A loaded this page)
    supabase
      .from('comparison_results')
      .select('id')
      .eq('pairing_id', pairingId)
      .maybeSingle()
      .then(({ data }) => { if (data) setReady(true) })

    // Subscribe to pairing status updates
    const channel = supabase
      .channel(`pairing-status-${pairingId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'pairings',
          filter: `id=eq.${pairingId}`,
        },
        (payload) => {
          if ((payload.new as { status: string }).status === 'active') {
            setReady(true)
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [pairingId])

  if (ready) {
    return (
      <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
        <span className="text-sm text-gray-700">Your comparison is ready</span>
        <Link
          href={`/compare/${pairingId}`}
          className="text-sm font-medium text-gray-900 hover:underline shrink-0"
        >
          View it →
        </Link>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-gray-100 rounded-xl">
      <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
      <span className="text-sm text-gray-500">Waiting for partner to finish the quiz…</span>
    </div>
  )
}
