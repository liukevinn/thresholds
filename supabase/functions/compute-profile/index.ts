import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ============================================================
// SCORING CONFIGURATION — SERVER-SIDE ONLY
// All 30 scenarios with threshold weights and per-option scores.
// This data is never exposed to the client.
// ============================================================

type Weight = 1 | 2 | 3
type OptionScores = { A: number; B: number; C: number; D: number }
type ThresholdConfig = { weight: Weight; scores: OptionScores }
type ScenarioConfig = { thresholds: Record<string, ThresholdConfig> }
type ScoringConfig = Record<number, ScenarioConfig>

const SCORING_CONFIG: ScoringConfig = {
  1: {
    thresholds: {
      confrontation_comfort:   { weight: 3, scores: { A: 20, B: 55, C: 85, D: 10 } },
      vulnerability_readiness: { weight: 3, scores: { A: 30, B: 70, C: 40, D: 15 } },
      directness:              { weight: 3, scores: { A: 25, B: 65, C: 90, D: 10 } },
      standards_imposition:    { weight: 1, scores: { A: 20, B: 50, C: 85, D: 40 } },
      empathic_bandwidth:      { weight: 1, scores: { A: 80, B: 75, C: 30, D: 50 } },
      emotional_tolerance:     { weight: 1, scores: { A: 75, B: 70, C: 40, D: 25 } },
    },
  },
  2: {
    thresholds: {
      recovery_speed:          { weight: 3, scores: { A: 90, B: 60, C: 30, D: 15 } },
      standards_imposition:    { weight: 3, scores: { A: 15, B: 65, C: 85, D: 55 } },
      interpretation_charity:  { weight: 3, scores: { A: 90, B: 65, C: 25, D: 30 } },
      directness:              { weight: 1, scores: { A: 30, B: 75, C: 80, D: 10 } },
      confrontation_comfort:   { weight: 1, scores: { A: 20, B: 60, C: 80, D: 10 } },
      emotional_tolerance:     { weight: 1, scores: { A: 80, B: 65, C: 35, D: 20 } },
    },
  },
  3: {
    thresholds: {
      emotional_tolerance:     { weight: 3, scores: { A: 75, B: 30, C: 20, D: 45 } },
      stubbornness:            { weight: 3, scores: { A: 40, B: 90, C: 35, D: 15 } },
      personal_space_needs:    { weight: 3, scores: { A: 85, B: 10, C: 40, D: 30 } },
      vulnerability_readiness: { weight: 1, scores: { A: 50, B: 30, C: 85, D: 20 } },
      recovery_speed:          { weight: 1, scores: { A: 55, B: 40, C: 30, D: 70 } },
      confrontation_comfort:   { weight: 1, scores: { A: 50, B: 85, C: 25, D: 15 } },
    },
  },
  4: {
    thresholds: {
      recovery_speed:          { weight: 3, scores: { A: 85, B: 50, C: 15, D: 30 } },
      directness:              { weight: 3, scores: { A: 25, B: 70, C: 10, D: 90 } },
      interpretation_charity:  { weight: 3, scores: { A: 85, B: 65, C: 15, D: 40 } },
      vulnerability_readiness: { weight: 1, scores: { A: 20, B: 75, C: 10, D: 55 } },
      confrontation_comfort:   { weight: 1, scores: { A: 15, B: 55, C: 20, D: 85 } },
      standards_imposition:    { weight: 1, scores: { A: 15, B: 45, C: 70, D: 75 } },
    },
  },
  5: {
    thresholds: {
      empathic_bandwidth:      { weight: 3, scores: { A: 90, B: 70, C: 40, D: 60 } },
      listening_patience:      { weight: 3, scores: { A: 90, B: 70, C: 35, D: 55 } },
      vulnerability_readiness: { weight: 2, scores: { A: 30, B: 75, C: 45, D: 15 } },
      emotional_tolerance:     { weight: 1, scores: { A: 70, B: 80, C: 50, D: 30 } },
      responsibility_ownership:{ weight: 1, scores: { A: 65, B: 70, C: 40, D: 45 } },
    },
  },
  6: {
    thresholds: {
      stubbornness:            { weight: 3, scores: { A: 10, B: 40, C: 90, D: 65 } },
      criticism_receptivity:   { weight: 3, scores: { A: 85, B: 65, C: 15, D: 30 } },
      change_willingness:      { weight: 2, scores: { A: 85, B: 60, C: 10, D: 25 } },
      directness:              { weight: 1, scores: { A: 50, B: 75, C: 80, D: 10 } },
      responsibility_ownership:{ weight: 1, scores: { A: 70, B: 65, C: 25, D: 40 } },
    },
  },
  7: {
    thresholds: {
      emotional_tolerance:     { weight: 3, scores: { A: 90, B: 75, C: 45, D: 35 } },
      empathic_bandwidth:      { weight: 2, scores: { A: 90, B: 70, C: 50, D: 25 } },
      recovery_speed:          { weight: 2, scores: { A: 30, B: 45, C: 75, D: 55 } },
      listening_patience:      { weight: 1, scores: { A: 85, B: 70, C: 30, D: 40 } },
      personal_space_needs:    { weight: 1, scores: { A: 15, B: 50, C: 30, D: 85 } },
    },
  },
  8: {
    thresholds: {
      vulnerability_readiness: { weight: 3, scores: { A: 80, B: 20, C: 50, D: 65 } },
      responsibility_ownership:{ weight: 3, scores: { A: 70, B: 30, C: 85, D: 55 } },
      confrontation_comfort:   { weight: 2, scores: { A: 65, B: 15, C: 80, D: 40 } },
      change_willingness:      { weight: 1, scores: { A: 65, B: 25, C: 85, D: 50 } },
      interpretation_charity:  { weight: 1, scores: { A: 60, B: 85, C: 30, D: 45 } },
    },
  },
  9: {
    thresholds: {
      change_willingness:      { weight: 3, scores: { A: 65, B: 20, C: 80, D: 75 } },
      stubbornness:            { weight: 2, scores: { A: 50, B: 15, C: 80, D: 35 } },
      criticism_receptivity:   { weight: 2, scores: { A: 55, B: 85, C: 25, D: 70 } },
      standards_imposition:    { weight: 1, scores: { A: 60, B: 10, C: 85, D: 45 } },
      directness:              { weight: 1, scores: { A: 70, B: 20, C: 90, D: 60 } },
    },
  },
  10: {
    thresholds: {
      decision_independence:   { weight: 3, scores: { A: 45, B: 85, C: 25, D: 60 } },
      personal_space_needs:    { weight: 3, scores: { A: 50, B: 85, C: 30, D: 65 } },
      listening_patience:      { weight: 2, scores: { A: 65, B: 70, C: 75, D: 30 } },
      empathic_bandwidth:      { weight: 1, scores: { A: 70, B: 50, C: 65, D: 25 } },
      confrontation_comfort:   { weight: 1, scores: { A: 60, B: 15, C: 75, D: 10 } },
    },
  },
  11: {
    thresholds: {
      decision_independence:   { weight: 3, scores: { A: 90, B: 40, C: 20, D: 30 } },
      directness:              { weight: 3, scores: { A: 75, B: 60, C: 65, D: 35 } },
      stubbornness:            { weight: 2, scores: { A: 30, B: 50, C: 70, D: 25 } },
      standards_imposition:    { weight: 1, scores: { A: 25, B: 45, C: 80, D: 20 } },
      listening_patience:      { weight: 1, scores: { A: 50, B: 85, C: 35, D: 65 } },
    },
  },
  12: {
    thresholds: {
      standards_imposition:    { weight: 3, scores: { A: 50, B: 80, C: 30, D: 85 } },
      change_willingness:      { weight: 3, scores: { A: 65, B: 25, C: 85, D: 15 } },
      criticism_receptivity:   { weight: 2, scores: { A: 70, B: 25, C: 85, D: 15 } },
      directness:              { weight: 1, scores: { A: 60, B: 70, C: 75, D: 85 } },
      responsibility_ownership:{ weight: 1, scores: { A: 70, B: 20, C: 90, D: 15 } },
    },
  },
  13: {
    thresholds: {
      listening_patience:      { weight: 3, scores: { A: 90, B: 60, C: 30, D: 40 } },
      emotional_tolerance:     { weight: 2, scores: { A: 75, B: 65, C: 50, D: 25 } },
      empathic_bandwidth:      { weight: 2, scores: { A: 85, B: 65, C: 45, D: 20 } },
      interpretation_charity:  { weight: 1, scores: { A: 80, B: 60, C: 40, D: 25 } },
      confrontation_comfort:   { weight: 1, scores: { A: 15, B: 55, C: 75, D: 10 } },
    },
  },
  14: {
    thresholds: {
      responsibility_ownership:{ weight: 3, scores: { A: 90, B: 10, C: 70, D: 50 } },
      criticism_receptivity:   { weight: 3, scores: { A: 85, B: 10, C: 65, D: 40 } },
      interpretation_charity:  { weight: 2, scores: { A: 80, B: 20, C: 60, D: 50 } },
      recovery_speed:          { weight: 1, scores: { A: 50, B: 40, C: 55, D: 80 } },
      stubbornness:            { weight: 1, scores: { A: 15, B: 90, C: 35, D: 45 } },
    },
  },
  15: {
    thresholds: {
      personal_space_needs:    { weight: 3, scores: { A: 90, B: 80, C: 50, D: 10 } },
      decision_independence:   { weight: 2, scores: { A: 85, B: 70, C: 45, D: 15 } },
      vulnerability_readiness: { weight: 2, scores: { A: 30, B: 80, C: 55, D: 25 } },
      emotional_tolerance:     { weight: 1, scores: { A: 60, B: 75, C: 65, D: 40 } },
      empathic_bandwidth:      { weight: 1, scores: { A: 30, B: 65, C: 70, D: 80 } },
    },
  },
  16: {
    thresholds: {
      change_willingness:      { weight: 3, scores: { A: 70, B: 25, C: 65, D: 85 } },
      directness:              { weight: 2, scores: { A: 65, B: 20, C: 75, D: 90 } },
      standards_imposition:    { weight: 2, scores: { A: 60, B: 15, C: 55, D: 90 } },
      stubbornness:            { weight: 1, scores: { A: 45, B: 15, C: 50, D: 80 } },
      responsibility_ownership:{ weight: 1, scores: { A: 55, B: 40, C: 60, D: 50 } },
    },
  },
  17: {
    thresholds: {
      stubbornness:            { weight: 3, scores: { A: 30, B: 25, C: 75, D: 35 } },
      decision_independence:   { weight: 2, scores: { A: 25, B: 55, C: 70, D: 40 } },
      confrontation_comfort:   { weight: 2, scores: { A: 50, B: 20, C: 65, D: 55 } },
      listening_patience:      { weight: 1, scores: { A: 60, B: 70, C: 30, D: 85 } },
      recovery_speed:          { weight: 1, scores: { A: 55, B: 65, C: 40, D: 50 } },
    },
  },
  18: {
    thresholds: {
      interpretation_charity:  { weight: 3, scores: { A: 70, B: 90, C: 30, D: 35 } },
      empathic_bandwidth:      { weight: 2, scores: { A: 65, B: 75, C: 40, D: 30 } },
      listening_patience:      { weight: 2, scores: { A: 70, B: 80, C: 35, D: 40 } },
      emotional_tolerance:     { weight: 1, scores: { A: 70, B: 85, C: 35, D: 30 } },
      vulnerability_readiness: { weight: 1, scores: { A: 65, B: 25, C: 60, D: 10 } },
    },
  },
  19: {
    thresholds: {
      criticism_receptivity:   { weight: 3, scores: { A: 15, B: 90, C: 50, D: 65 } },
      recovery_speed:          { weight: 2, scores: { A: 25, B: 50, C: 45, D: 85 } },
      change_willingness:      { weight: 2, scores: { A: 20, B: 80, C: 55, D: 50 } },
      responsibility_ownership:{ weight: 1, scores: { A: 15, B: 85, C: 50, D: 40 } },
      personal_space_needs:    { weight: 1, scores: { A: 75, B: 40, C: 55, D: 30 } },
    },
  },
  20: {
    thresholds: {
      responsibility_ownership:{ weight: 3, scores: { A: 90, B: 40, C: 65, D: 70 } },
      vulnerability_readiness: { weight: 2, scores: { A: 55, B: 25, C: 60, D: 80 } },
      standards_imposition:    { weight: 2, scores: { A: 30, B: 75, C: 50, D: 20 } },
      decision_independence:   { weight: 1, scores: { A: 35, B: 60, C: 45, D: 40 } },
      interpretation_charity:  { weight: 1, scores: { A: 75, B: 30, C: 55, D: 65 } },
    },
  },
  21: {
    thresholds: {
      empathic_bandwidth:      { weight: 3, scores: { A: 55, B: 40, C: 35, D: 85 } },
      personal_space_needs:    { weight: 2, scores: { A: 40, B: 80, C: 50, D: 35 } },
      emotional_tolerance:     { weight: 2, scores: { A: 55, B: 75, C: 60, D: 45 } },
      interpretation_charity:  { weight: 1, scores: { A: 50, B: 75, C: 25, D: 65 } },
      listening_patience:      { weight: 1, scores: { A: 45, B: 60, C: 25, D: 80 } },
    },
  },
  22: {
    thresholds: {
      interpretation_charity:  { weight: 3, scores: { A: 65, B: 90, C: 25, D: 55 } },
      confrontation_comfort:   { weight: 2, scores: { A: 60, B: 15, C: 80, D: 20 } },
      directness:              { weight: 2, scores: { A: 70, B: 20, C: 85, D: 25 } },
      criticism_receptivity:   { weight: 1, scores: { A: 65, B: 80, C: 30, D: 55 } },
      stubbornness:            { weight: 1, scores: { A: 30, B: 15, C: 70, D: 35 } },
    },
  },
  23: {
    thresholds: {
      decision_independence:   { weight: 3, scores: { A: 35, B: 40, C: 15, D: 75 } },
      personal_space_needs:    { weight: 2, scores: { A: 60, B: 55, C: 85, D: 15 } },
      standards_imposition:    { weight: 2, scores: { A: 65, B: 55, C: 90, D: 10 } },
      vulnerability_readiness: { weight: 1, scores: { A: 65, B: 50, C: 40, D: 10 } },
      recovery_speed:          { weight: 1, scores: { A: 55, B: 70, C: 20, D: 80 } },
    },
  },
  24: {
    thresholds: {
      criticism_receptivity:   { weight: 3, scores: { A: 90, B: 20, C: 65, D: 30 } },
      responsibility_ownership:{ weight: 2, scores: { A: 75, B: 25, C: 60, D: 35 } },
      change_willingness:      { weight: 2, scores: { A: 85, B: 15, C: 60, D: 30 } },
      emotional_tolerance:     { weight: 1, scores: { A: 70, B: 40, C: 65, D: 35 } },
      confrontation_comfort:   { weight: 1, scores: { A: 20, B: 75, C: 30, D: 70 } },
    },
  },
  25: {
    thresholds: {
      listening_patience:      { weight: 3, scores: { A: 90, B: 30, C: 60, D: 65 } },
      empathic_bandwidth:      { weight: 2, scores: { A: 90, B: 25, C: 60, D: 55 } },
      recovery_speed:          { weight: 2, scores: { A: 30, B: 75, C: 55, D: 60 } },
      directness:              { weight: 1, scores: { A: 40, B: 65, C: 70, D: 50 } },
      stubbornness:            { weight: 1, scores: { A: 65, B: 65, C: 30, D: 20 } },
    },
  },
  26: {
    thresholds: {
      vulnerability_readiness: { weight: 3, scores: { A: 75, B: 25, C: 60, D: 70 } },
      emotional_tolerance:     { weight: 2, scores: { A: 60, B: 80, C: 35, D: 70 } },
      confrontation_comfort:   { weight: 2, scores: { A: 65, B: 15, C: 85, D: 55 } },
      personal_space_needs:    { weight: 1, scores: { A: 30, B: 85, C: 20, D: 50 } },
      interpretation_charity:  { weight: 1, scores: { A: 55, B: 85, C: 20, D: 65 } },
    },
  },
  27: {
    thresholds: {
      change_willingness:      { weight: 3, scores: { A: 35, B: 50, C: 40, D: 80 } },
      responsibility_ownership:{ weight: 2, scores: { A: 45, B: 60, C: 50, D: 85 } },
      stubbornness:            { weight: 2, scores: { A: 30, B: 75, C: 40, D: 25 } },
      standards_imposition:    { weight: 1, scores: { A: 30, B: 70, C: 50, D: 55 } },
      criticism_receptivity:   { weight: 1, scores: { A: 40, B: 35, C: 50, D: 80 } },
    },
  },
  28: {
    thresholds: {
      recovery_speed:          { weight: 3, scores: { A: 80, B: 25, C: 60, D: 45 } },
      decision_independence:   { weight: 2, scores: { A: 60, B: 40, C: 45, D: 55 } },
      interpretation_charity:  { weight: 2, scores: { A: 65, B: 50, C: 70, D: 75 } },
      listening_patience:      { weight: 1, scores: { A: 40, B: 55, C: 50, D: 85 } },
      empathic_bandwidth:      { weight: 1, scores: { A: 45, B: 50, C: 65, D: 80 } },
    },
  },
  29: {
    thresholds: {
      standards_imposition:    { weight: 3, scores: { A: 75, B: 25, C: 55, D: 50 } },
      directness:              { weight: 2, scores: { A: 50, B: 70, C: 55, D: 80 } },
      stubbornness:            { weight: 2, scores: { A: 30, B: 70, C: 40, D: 25 } },
      emotional_tolerance:     { weight: 1, scores: { A: 65, B: 50, C: 60, D: 55 } },
      change_willingness:      { weight: 1, scores: { A: 70, B: 30, C: 60, D: 55 } },
    },
  },
  30: {
    thresholds: {
      personal_space_needs:    { weight: 3, scores: { A: 20, B: 40, C: 45, D: 85 } },
      vulnerability_readiness: { weight: 2, scores: { A: 70, B: 80, C: 50, D: 15 } },
      responsibility_ownership:{ weight: 2, scores: { A: 75, B: 65, C: 55, D: 20 } },
      decision_independence:   { weight: 1, scores: { A: 25, B: 40, C: 50, D: 85 } },
      recovery_speed:          { weight: 1, scores: { A: 55, B: 50, C: 60, D: 70 } },
    },
  },
}

// ============================================================
// ALL THRESHOLD KEYS
// ============================================================

const ALL_THRESHOLDS = [
  'emotional_tolerance',
  'vulnerability_readiness',
  'empathic_bandwidth',
  'stubbornness',
  'confrontation_comfort',
  'recovery_speed',
  'directness',
  'listening_patience',
  'interpretation_charity',
  'decision_independence',
  'standards_imposition',
  'personal_space_needs',
  'criticism_receptivity',
  'responsibility_ownership',
  'change_willingness',
] as const

type ThresholdKey = typeof ALL_THRESHOLDS[number]

// ============================================================
// SCORING ALGORITHM
// ============================================================

function computeProfile(
  responses: Record<number, 'A' | 'B' | 'C' | 'D'>
): Record<ThresholdKey, number> {
  const profile = {} as Record<ThresholdKey, number>

  for (const threshold of ALL_THRESHOLDS) {
    let weightedSum = 0
    let totalWeight = 0

    for (const [scenarioStr, scenarioConfig] of Object.entries(SCORING_CONFIG)) {
      const scenarioNum = parseInt(scenarioStr, 10)
      const thresholdConfig = scenarioConfig.thresholds[threshold]
      if (!thresholdConfig) continue

      const selected = responses[scenarioNum]
      if (!selected) continue

      const score = thresholdConfig.scores[selected]
      const weight = thresholdConfig.weight

      weightedSum += score * weight
      totalWeight += weight
    }

    profile[threshold] = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) / 100 : 0
  }

  return profile
}

// ============================================================
// EDGE FUNCTION HANDLER
// ============================================================

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Verify JWT and extract user
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const body = await req.json()
    const requestedUserId: string = body.user_id
    const responseVersion: number = body.response_version ?? 1

    // Ensure JWT matches requested user
    if (user.id !== requestedUserId) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Load quiz responses
    const { data: quizRows, error: fetchError } = await supabase
      .from('quiz_responses')
      .select('scenario_number, selected_option')
      .eq('user_id', requestedUserId)
      .eq('response_version', responseVersion)

    if (fetchError) {
      return new Response(JSON.stringify({ error: 'Failed to load responses' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!quizRows || quizRows.length !== 30) {
      return new Response(JSON.stringify({ error: 'Incomplete quiz — 30 responses required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Build responses map
    const responsesMap: Record<number, 'A' | 'B' | 'C' | 'D'> = {}
    for (const row of quizRows) {
      responsesMap[row.scenario_number] = row.selected_option as 'A' | 'B' | 'C' | 'D'
    }

    // Run scoring algorithm
    const scores = computeProfile(responsesMap)

    // Upsert threshold_profiles
    const { error: upsertError } = await supabase
      .from('threshold_profiles')
      .upsert(
        {
          user_id: requestedUserId,
          profile_version: responseVersion,
          computed_at: new Date().toISOString(),
          ...scores,
        },
        { onConflict: 'user_id,profile_version' }
      )

    if (upsertError) {
      return new Response(JSON.stringify({ error: 'Failed to save profile' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Mark quiz as completed
    await supabase
      .from('profiles')
      .update({ quiz_completed: true, quiz_completed_at: new Date().toISOString() })
      .eq('id', requestedUserId)

    return new Response(
      JSON.stringify({ profile: { user_id: requestedUserId, ...scores, profile_version: responseVersion } }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
