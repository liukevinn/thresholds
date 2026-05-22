import type { ThresholdKey } from '@/types/quiz'

export interface ThresholdMeta {
  key: ThresholdKey
  abbr: string
  label: string
  group: 'Emotional Processing' | 'Conflict Engagement' | 'Communication Style' | 'Autonomy & Control' | 'Accountability & Growth'
  description: string
}

export const THRESHOLDS: ThresholdMeta[] = [
  {
    key: 'emotional_tolerance',
    abbr: 'ET',
    label: 'Emotional Tolerance',
    group: 'Emotional Processing',
    description: 'How much emotional intensity someone can handle before shutting down or escalating',
  },
  {
    key: 'vulnerability_readiness',
    abbr: 'VR',
    label: 'Vulnerability Readiness',
    group: 'Emotional Processing',
    description: 'How willing someone is to expose their own feelings and uncertainties',
  },
  {
    key: 'empathic_bandwidth',
    abbr: 'EB',
    label: 'Empathic Bandwidth',
    group: 'Emotional Processing',
    description: 'How much capacity someone has to hold space for another person\'s emotions',
  },
  {
    key: 'stubbornness',
    abbr: 'ST',
    label: 'Stubbornness',
    group: 'Conflict Engagement',
    description: 'How tightly someone holds their position when challenged',
  },
  {
    key: 'confrontation_comfort',
    abbr: 'CC',
    label: 'Confrontation Comfort',
    group: 'Conflict Engagement',
    description: 'How readily someone addresses problems directly versus avoids them',
  },
  {
    key: 'recovery_speed',
    abbr: 'RS',
    label: 'Recovery Speed',
    group: 'Conflict Engagement',
    description: 'How quickly someone moves past a disagreement and returns to baseline',
  },
  {
    key: 'directness',
    abbr: 'DI',
    label: 'Directness',
    group: 'Communication Style',
    description: 'How bluntly someone communicates versus how much they soften or imply',
  },
  {
    key: 'listening_patience',
    abbr: 'LP',
    label: 'Listening Patience',
    group: 'Communication Style',
    description: 'How long someone can take in another perspective before needing to respond or react',
  },
  {
    key: 'interpretation_charity',
    abbr: 'IC',
    label: 'Interpretation Charity',
    group: 'Communication Style',
    description: 'Whether someone defaults to assuming good or bad intent',
  },
  {
    key: 'decision_independence',
    abbr: 'DIN',
    label: 'Decision Independence',
    group: 'Autonomy & Control',
    description: 'How much someone needs to consult others versus acting on their own',
  },
  {
    key: 'standards_imposition',
    abbr: 'SI',
    label: 'Standards Imposition',
    group: 'Autonomy & Control',
    description: 'How strongly someone expects others to meet their personal standards',
  },
  {
    key: 'personal_space_needs',
    abbr: 'PS',
    label: 'Personal Space Needs',
    group: 'Autonomy & Control',
    description: 'How much alone time or independence someone requires',
  },
  {
    key: 'criticism_receptivity',
    abbr: 'CR',
    label: 'Criticism Receptivity',
    group: 'Accountability & Growth',
    description: 'How much feedback someone can absorb before becoming defensive',
  },
  {
    key: 'responsibility_ownership',
    abbr: 'RO',
    label: 'Responsibility Ownership',
    group: 'Accountability & Growth',
    description: 'How readily someone acknowledges their role in a problem',
  },
  {
    key: 'change_willingness',
    abbr: 'CW',
    label: 'Change Willingness',
    group: 'Accountability & Growth',
    description: 'How open someone is to adjusting their behavior when asked',
  },
]

export const THRESHOLD_GROUPS = [
  'Emotional Processing',
  'Conflict Engagement',
  'Communication Style',
  'Autonomy & Control',
  'Accountability & Growth',
] as const

export const DESCRIPTOR_RANGES = [
  { min: 0,  max: 25,  label: 'Low',           meaning: 'This trait is not a strong part of how you engage' },
  { min: 26, max: 50,  label: 'Moderate-Low',  meaning: 'You lean away from this trait in most situations' },
  { min: 51, max: 75,  label: 'Moderate-High', meaning: 'You lean toward this trait in most situations' },
  { min: 76, max: 100, label: 'High',           meaning: 'This trait is a defining part of how you engage' },
] as const

export function getDescriptor(score: number): typeof DESCRIPTOR_RANGES[number] {
  return DESCRIPTOR_RANGES.find((r) => score >= r.min && score <= r.max) ?? DESCRIPTOR_RANGES[3]
}
