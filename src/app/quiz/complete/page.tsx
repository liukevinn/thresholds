'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
      setError('Failed to save your responses. Please try again.')
      setSubmitting(false)
      return
    }

    const { data: fnData, error: fnError } = await supabase.functions.invoke('compute-profile', {
      body: { user_id: user.id },
    })

    if (fnError || fnData?.error) {
      setError('Failed to compute your profile. Please try again.')
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

  if (answeredCount < 30 && !submitting) return <div className="min-h-screen bg-white" />

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="max-w-md">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">All 30 scenarios complete</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Submit your responses to generate your threshold profile. This takes a few seconds.
        </p>

        {error && (
          <p className="text-sm text-red-600 mb-4">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Calculating your profile...' : 'See My Results'}
        </button>
      </div>
    </div>
  )
}
