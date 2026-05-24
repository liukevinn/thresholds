'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/stores/quizStore'

export default function RetakeButton() {
  const router = useRouter()
  const reset = useQuizStore((s) => s.reset)
  const [confirming, setConfirming] = useState(false)

  function handleConfirm() {
    reset()
    router.push('/quiz/1')
  }

  if (confirming) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-warning bg-warning/10 border border-warning/20 rounded-lg px-4 py-3 leading-relaxed">
          this will replace your current profile. any active comparison with a partner will be recalculated automatically once both of you have current profiles.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            yes, retake the quiz
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-4 py-2 border border-border text-sm font-medium text-foreground rounded-lg hover:border-primary/50 transition-colors"
    >
      retake quiz
    </button>
  )
}
