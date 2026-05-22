export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string
          avatar_url: string | null
          quiz_completed: boolean
          quiz_completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name: string
          avatar_url?: string | null
          quiz_completed?: boolean
          quiz_completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          display_name?: string
          avatar_url?: string | null
          quiz_completed?: boolean
          quiz_completed_at?: string | null
          updated_at?: string
        }
      }
      quiz_responses: {
        Row: {
          id: string
          user_id: string
          scenario_number: number
          selected_option: 'A' | 'B' | 'C' | 'D'
          response_version: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          scenario_number: number
          selected_option: 'A' | 'B' | 'C' | 'D'
          response_version?: number
          created_at?: string
        }
        Update: never
      }
      threshold_profiles: {
        Row: {
          id: string
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
        Insert: {
          id?: string
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
          profile_version?: number
          computed_at?: string
        }
        Update: never
      }
      pairings: {
        Row: {
          id: string
          user_a_id: string
          user_b_id: string | null
          invite_code: string
          status: 'pending' | 'accepted' | 'active' | 'expired'
          label: string | null
          created_at: string
          accepted_at: string | null
          expires_at: string
        }
        Insert: {
          id?: string
          user_a_id: string
          user_b_id?: string | null
          invite_code: string
          status?: 'pending' | 'accepted' | 'active' | 'expired'
          label?: string | null
          created_at?: string
          accepted_at?: string | null
          expires_at?: string
        }
        Update: {
          user_b_id?: string | null
          status?: 'pending' | 'accepted' | 'active' | 'expired'
          label?: string | null
          accepted_at?: string | null
        }
      }
      comparison_results: {
        Row: {
          id: string
          pairing_id: string
          deltas: Json
          friction_scores: Json
          zone_classifications: Json
          detected_patterns: Json
          alignment_highlights: Json
          tension_highlights: Json
          computed_at: string
        }
        Insert: {
          id?: string
          pairing_id: string
          deltas: Json
          friction_scores: Json
          zone_classifications: Json
          detected_patterns: Json
          alignment_highlights: Json
          tension_highlights: Json
          computed_at?: string
        }
        Update: never
      }
    }
  }
}
