'use client'

interface QuizNavProps {
  canGoBack: boolean
  canGoNext: boolean
  isLastScenario: boolean
  onBack: () => void
  onNext: () => void
}

export default function QuizNav({ canGoBack, canGoNext, isLastScenario, onBack, onNext }: QuizNavProps) {
  return (
    <div className="flex items-center justify-between pt-6 pb-8">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        Back
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="px-6 py-2.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        {isLastScenario ? 'Complete Quiz' : 'Next'}
      </button>
    </div>
  )
}
