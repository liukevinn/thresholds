export type Zone = 'alignment' | 'awareness' | 'tension'

export interface HighlightItem {
  threshold_key: string
  score_a: number
  score_b: number
  delta: number
  friction_score: number
  zone: Zone
}

export interface DetectedPattern {
  pattern_id: number
  name: string
  description: string
  guidance: string
  triggering_deltas: Record<string, number>
}

export interface ComparisonResult {
  id: string
  pairing_id: string
  deltas: Record<string, number>
  friction_scores: Record<string, number>
  zone_classifications: Record<string, Zone>
  detected_patterns: DetectedPattern[]
  alignment_highlights: HighlightItem[]
  tension_highlights: HighlightItem[]
  computed_at: string
}
