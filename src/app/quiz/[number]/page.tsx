'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ScenarioCard from '@/components/quiz/ScenarioCard'
import QuizNav from '@/components/quiz/QuizNav'
import { useQuizStore } from '@/stores/quizStore'
import { SCENARIOS } from '@/lib/constants/scenarios'
import type { ScenarioOption } from '@/types/quiz'

export default function ScenarioPage() {
  const router = useRouter()
  const params = useParams()
  const scenarioNum = parseInt(params.number as string, 10)

  const { responses, setResponse, currentScenario } = useQuizStore()

  const scenario = SCENARIOS.find((s) => s.number === scenarioNum)

  useEffect(() => {
    if (!scenario) {
      router.replace('/quiz')
    }
  }, [scenario, router])

  useEffect(() => {
    if (scenarioNum !== currentScenario) {
      useQuizStore.setState({ currentScenario: scenarioNum })
    }
  }, [scenarioNum, currentScenario])

  if (!scenario) return null

  const selectedOption = responses[scenarioNum]
  const canGoNext = !!selectedOption
  const canGoBack = scenarioNum > 1
  const isLastScenario = scenarioNum === 30

  function handleSelect(option: ScenarioOption) {
    setResponse(scenarioNum, option)
  }

  function handleNext() {
    if (isLastScenario) {
      router.push('/quiz/complete')
    } else {
      router.push(`/quiz/${scenarioNum + 1}`)
    }
  }

  function handleBack() {
    if (canGoBack) {
      router.push(`/quiz/${scenarioNum - 1}`)
    }
  }

  return (
    <div className="pt-6 pb-28">
      <ScenarioCard
        scenario={scenario}
        selectedOption={selectedOption}
        onSelect={handleSelect}
      />
      <QuizNav
        canGoBack={canGoBack}
        canGoNext={canGoNext}
        isLastScenario={isLastScenario}
        onBack={handleBack}
        onNext={handleNext}
      />
    </div>
  )
}
