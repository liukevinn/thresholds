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
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-background border-t border-border">
      <div className="w-full max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            back
          </button>

          <button
            onClick={onNext}
            disabled={!canGoNext}
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            {isLastScenario ? 'complete quiz' : 'next'}
          </button>
        </div>
      </div>
    </div>
  )
}
