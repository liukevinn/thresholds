'use client'

interface QuizProgressProps {
  currentScenario: number
}

const BATCH_LABELS = [
  { range: [1, 10],  label: 'Romantic Conflict' },
  { range: [11, 20], label: 'Daily Life & Logistics' },
  { range: [21, 30], label: 'Social & External' },
]

function getBatchLabel(scenario: number): string {
  return BATCH_LABELS.find(({ range }) => scenario >= range[0] && scenario <= range[1])?.label ?? ''
}

export default function QuizProgress({ currentScenario }: QuizProgressProps) {
  const percent = Math.round(((currentScenario - 1) / 30) * 100)
  const batchLabel = getBatchLabel(currentScenario)

  return (
    <div className="w-full px-6 pt-6 pb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-foreground">{batchLabel}</span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">{currentScenario} / 30</span>
      </div>
      <div className="w-full h-3 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
