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
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 leading-relaxed">
          This will replace your current profile. Any active comparison with a partner will be recalculated automatically once both of you have current profiles.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            Yes, retake the quiz
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
    >
      Retake quiz
    </button>
  )
}
