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
      <div className="bg-gray-50 rounded-2xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Scenario {scenario.number}
        </p>
        <p className="text-gray-800 leading-relaxed text-[15px]">{scenario.situation}</p>
      </div>

      <div>
        <p className="text-base font-semibold text-gray-900 mb-4">{scenario.question}</p>
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
