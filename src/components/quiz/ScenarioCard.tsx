'use client'

import OptionButton from './OptionButton'
import type { Scenario, ScenarioOption } from '@/types/quiz'

interface ScenarioCardProps {
  scenario: Scenario
  selectedOption: ScenarioOption | undefined
  onSelect: (option: ScenarioOption) => void
}

const OPTIONS: ScenarioOption[] = ['A', 'B', 'C', 'D']

export default function ScenarioCard({ scenario, selectedOption, onSelect }: ScenarioCardProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-muted rounded-2xl p-6">
        <p className="label-caps mb-3">scenario {scenario.number}</p>
        <p className="text-base text-foreground leading-relaxed">{scenario.situation}</p>
      </div>

      <div>
        <p className="text-base font-bold text-foreground mb-4">{scenario.question}</p>
        <div className="flex flex-col gap-3">
          {OPTIONS.map((opt) => (
            <OptionButton
              key={opt}
              label={opt}
              text={scenario.options[opt]}
              selected={selectedOption === opt}
              onClick={() => onSelect(opt)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
