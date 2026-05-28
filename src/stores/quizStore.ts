'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ScenarioOption } from '@/types/quiz'

interface QuizStore {
  responses: Record<number, ScenarioOption>
  currentScenario: number
  isComplete: boolean
  setResponse: (scenario: number, option: ScenarioOption) => void
  goNext: () => void
  goBack: () => void
  reset: () => void
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      responses: {},
      currentScenario: 1,
      isComplete: false,

      setResponse: (scenario, option) => {
        set((state) => ({
          responses: { ...state.responses, [scenario]: option },
        }))
      },

      goNext: () => {
        const { currentScenario, responses } = get()
        if (currentScenario < 30) {
          set({ currentScenario: currentScenario + 1 })
        } else if (Object.keys(responses).length === 30) {
          set({ isComplete: true })
        }
      },

      goBack: () => {
        const { currentScenario } = get()
        if (currentScenario > 1) {
          set({ currentScenario: currentScenario - 1 })
        }
      },

      reset: () => {
        set({ responses: {}, currentScenario: 1, isComplete: false })
      },
    }),
    {
      name: 'threshold-quiz',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
