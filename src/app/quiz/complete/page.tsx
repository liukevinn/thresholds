'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useQuizStore } from '@/stores/quizStore'
import type { ScenarioOption } from '@/types/quiz'

export default function QuizCompletePage() {
  const router = useRouter()
  const { responses, reset } = useQuizStore()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const answeredCount = Object.keys(responses).length

  useEffect(() => {
    if (answeredCount < 30 && !submitting) {
      router.replace('/quiz/1')
    }
  }, [answeredCount, router, submitting])

  async function handleSubmit() {
    setError(null)
    setSubmitting(true)

    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth/login')
      return
    }

    const rows = Object.entries(responses).map(([scenarioNumber, selectedOption]) => ({
      user_id: user.id,
      scenario_number: parseInt(scenarioNumber, 10),
      selected_option: selectedOption as ScenarioOption,
    }))

    await supabase
      .from('quiz_responses')
      .delete()
      .eq('user_id', user.id)
      .eq('response_version', 1)

    const { error: insertError } = await supabase
      .from('quiz_responses')
      .insert(rows)

    if (insertError) {
      setError('failed to save your responses. please try again.')
      setSubmitting(false)
      return
    }

    const { data: fnData, error: fnError } = await supabase.functions.invoke('compute-profile', {
      body: { user_id: user.id },
    })

    if (fnError || fnData?.error) {
      setError('failed to compute your profile. please try again.')
      setSubmitting(false)
      return
    }

    reset()
    const pendingInvite = sessionStorage.getItem('pending_invite')
    if (pendingInvite) {
      sessionStorage.removeItem('pending_invite')
      router.push(`/invite/${pendingInvite}`)
    } else {
      router.push('/profile')
    }
  }

  if (answeredCount < 30 && !submitting) return <div className="min-h-screen bg-background" />

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="max-w-md w-full">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-6" />
        <h1 className="heading text-3xl text-foreground mb-3">all 30 done</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          submit your responses to generate your threshold profile. this takes a few seconds.
        </p>

        {error && (
          <p className="text-sm text-tension mb-4">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {submitting ? 'calculating your profile...' : 'see my results'}
        </button>
      </div>
    </div>
  )
}
