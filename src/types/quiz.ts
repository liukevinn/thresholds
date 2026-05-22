export type ScenarioOption = 'A' | 'B' | 'C' | 'D'

export interface Scenario {
  number: number
  batch: 'romantic' | 'daily' | 'social'
  batchLabel: string
  subject: 'Alice' | 'Ben' | 'them'
  situation: string
  question: string
  options: Record<ScenarioOption, string>
}

export interface ThresholdProfile {
  user_id: string
  emotional_tolerance: number
  vulnerability_readiness: number
  empathic_bandwidth: number
  stubbornness: number
  confrontation_comfort: number
  recovery_speed: number
  directness: number
  listening_patience: number
  interpretation_charity: number
  decision_independence: number
  standards_imposition: number
  personal_space_needs: number
  criticism_receptivity: number
  responsibility_ownership: number
  change_willingness: number
  profile_version: number
  computed_at: string
}

export type ThresholdKey = keyof Omit<ThresholdProfile, 'user_id' | 'profile_version' | 'computed_at'>
