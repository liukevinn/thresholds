'use client'

import { usePathname } from 'next/navigation'
import QuizProgress from '@/components/quiz/QuizProgress'
import { useQuizStore } from '@/stores/quizStore'

export default function QuizProgressWrapper() {
  const pathname = usePathname()
  const currentScenario = useQuizStore((s) => s.currentScenario)

  const isScenarioPage = /^\/quiz\/\d+$/.test(pathname)
  if (!isScenarioPage) return null

  return <QuizProgress currentScenario={currentScenario} />
}
