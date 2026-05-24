import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const THRESHOLD_KEYS = [
  'emotional_tolerance', 'vulnerability_readiness', 'empathic_bandwidth',
  'stubbornness', 'confrontation_comfort', 'recovery_speed',
  'directness', 'listening_patience', 'interpretation_charity',
  'decision_independence', 'standards_imposition', 'personal_space_needs',
  'criticism_receptivity', 'responsibility_ownership', 'change_willingness',
]

const FRICTION_COEFFICIENTS: Record<string, number> = {
  emotional_tolerance: 1.4,
  vulnerability_readiness: 1.2,
  empathic_bandwidth: 1.1,
  stubbornness: 1.4,
  confrontation_comfort: 1.5,
  recovery_speed: 1.3,
  directness: 1.2,
  listening_patience: 1.0,
  interpretation_charity: 1.3,
  decision_independence: 0.9,
  standards_imposition: 1.2,
  personal_space_needs: 1.0,
  criticism_receptivity: 1.3,
  responsibility_ownership: 1.2,
  change_willingness: 1.1,
}

type Zone = 'alignment' | 'awareness' | 'tension'

function classifyZone(delta: number): Zone {
  if (delta <= 20) return 'alignment'
  if (delta <= 45) return 'awareness'
  return 'tension'
}

interface PatternCondition { threshold: string; minDelta: number }
interface Pattern {
  id: number; name: string; description: string; guidance: string
  conditions: PatternCondition[]
}

const PATTERN_LIBRARY: Pattern[] = [
  {
    id: 1,
    name: 'The Pursue-Withdraw Cycle',
    description: "One partner pushes to resolve conflict immediately while the other needs space and time. The pursuer interprets withdrawal as avoidance; the withdrawer interprets pursuit as aggression. This creates a self-reinforcing loop where each person's coping mechanism triggers the other's.",
    guidance: "Establish a pause protocol: the withdrawer commits to naming when they need space and setting a specific time to revisit. The pursuer commits to honoring that timeline without follow-up pressure. Both agree that pausing is not abandoning.",
    conditions: [
      { threshold: 'confrontation_comfort', minDelta: 40 },
      { threshold: 'recovery_speed', minDelta: 30 },
    ],
  },
  {
    id: 2,
    name: 'The Deadlock Dynamic',
    description: "Both partners hold firm positions, but one has significantly less patience for hearing the other out. Disagreements stall because the less patient partner pushes for resolution before the more stubborn partner has been fully heard, leading to repeated circular arguments.",
    guidance: "Use structured turn-taking: each person gets uninterrupted time to state their full position before any response. Consider writing positions down to remove the pressure of real-time debate.",
    conditions: [
      { threshold: 'stubbornness', minDelta: 35 },
      { threshold: 'listening_patience', minDelta: 30 },
    ],
  },
  {
    id: 3,
    name: 'The Hidden Hurt Pattern',
    description: "One partner is reluctant to express hurt, while the other tends to assume the worst when something feels off. The less vulnerable partner buries their feelings; the less charitable partner reads the resulting distance as hostility or disinterest, creating phantom conflicts.",
    guidance: "The less vulnerable partner should practice flagging emotions early: 'Something is bothering me but I need time to articulate it.' The less charitable partner should practice asking before assuming: 'You seem off — is everything okay?'",
    conditions: [
      { threshold: 'vulnerability_readiness', minDelta: 40 },
      { threshold: 'interpretation_charity', minDelta: 35 },
    ],
  },
  {
    id: 4,
    name: 'The Standards Collision',
    description: "One partner has strong expectations for how things should be done, while the other becomes defensive when those expectations are expressed. The high-standards partner feels like they can never give feedback; the low-receptivity partner feels perpetually criticized.",
    guidance: "Reframe standards as preferences rather than rules. The high-standards partner should lead with 'I prefer' rather than 'You should.' The lower-receptivity partner should practice hearing feedback as information rather than judgment.",
    conditions: [
      { threshold: 'standards_imposition', minDelta: 35 },
      { threshold: 'criticism_receptivity', minDelta: 35 },
    ],
  },
  {
    id: 5,
    name: 'The Emotional Overload',
    description: "One partner processes emotions at high intensity while the other has limited capacity to absorb emotional weight. The more emotional partner feels unsupported; the lower-bandwidth partner feels overwhelmed and shuts down, which increases the first partner's intensity.",
    guidance: "Agree on emotional check-ins with defined time boundaries. The higher-intensity partner should signal the level of support they need: 'I just need you to listen for five minutes' versus 'I need your advice.' The lower-bandwidth partner should communicate limits before they hit overload.",
    conditions: [
      { threshold: 'emotional_tolerance', minDelta: 40 },
      { threshold: 'empathic_bandwidth', minDelta: 35 },
    ],
  },
  {
    id: 6,
    name: 'The Independence Friction',
    description: "One partner values autonomy and solo decision-making while the other expects joint involvement and togetherness. The independent partner feels controlled; the collaborative partner feels excluded. This manifests in decisions made without consultation and time spent apart without coordination.",
    guidance: "Define domains of independent versus shared decision-making explicitly. Some categories require consultation; others are autonomous. Make the boundaries explicit rather than assumed.",
    conditions: [
      { threshold: 'decision_independence', minDelta: 40 },
      { threshold: 'personal_space_needs', minDelta: 30 },
    ],
  },
  {
    id: 7,
    name: 'The Accountability Gap',
    description: "One partner readily acknowledges their role in problems and is open to adjusting behavior, while the other deflects responsibility and resists change. The accountable partner grows resentful from one-sided effort; the resistant partner feels like the relationship's problems are always being pinned on them.",
    guidance: "Implement a mutual feedback ritual — a regular check-in where both partners share one thing they appreciate and one thing they'd like to work on together. Framing change as mutual and ongoing reduces the sense that one person is always the one being 'fixed.'",
    conditions: [
      { threshold: 'responsibility_ownership', minDelta: 35 },
      { threshold: 'change_willingness', minDelta: 30 },
    ],
  },
  {
    id: 8,
    name: 'The Communication Mismatch',
    description: "One partner is blunt and explicit while the other communicates indirectly and protects their emotional exposure. The direct partner is frustrated by hints and subtext; the indirect partner feels steamrolled by bluntness. Important messages get lost in translation.",
    guidance: "Establish translation habits. The direct partner should lead important conversations with intent: 'I'm bringing this up because I care, not to attack.' The indirect partner should practice stating needs as clear requests rather than hoping they'll be inferred.",
    conditions: [
      { threshold: 'directness', minDelta: 40 },
      { threshold: 'vulnerability_readiness', minDelta: 30 },
    ],
  },
]

// deno-lint-ignore no-explicit-any
function computeComparison(profileA: Record<string, any>, profileB: Record<string, any>) {
  const deltas: Record<string, number> = {}
  const frictionScores: Record<string, number> = {}
  const zoneClassifications: Record<string, Zone> = {}

  for (const key of THRESHOLD_KEYS) {
    const delta = Math.abs(Number(profileA[key]) - Number(profileB[key]))
    deltas[key] = Math.round(delta * 100) / 100
    frictionScores[key] = Math.round(delta * FRICTION_COEFFICIENTS[key] * 100) / 100
    zoneClassifications[key] = classifyZone(delta)
  }

  const alignmentHighlights = THRESHOLD_KEYS
    .map((key) => ({
      threshold_key: key,
      score_a: Number(profileA[key]),
      score_b: Number(profileB[key]),
      delta: deltas[key],
      friction_score: frictionScores[key],
      zone: zoneClassifications[key],
    }))
    .sort((a, b) => a.delta - b.delta)
    .slice(0, 3)

  const tensionHighlights = THRESHOLD_KEYS
    .map((key) => ({
      threshold_key: key,
      score_a: Number(profileA[key]),
      score_b: Number(profileB[key]),
      delta: deltas[key],
      friction_score: frictionScores[key],
      zone: zoneClassifications[key],
    }))
    .sort((a, b) => b.friction_score - a.friction_score)
    .slice(0, 3)

  const detectedPatterns = []
  for (const pattern of PATTERN_LIBRARY) {
    const allMet = pattern.conditions.every((c) => deltas[c.threshold] >= c.minDelta)
    if (allMet) {
      const triggeringDeltas: Record<string, number> = {}
      for (const c of pattern.conditions) triggeringDeltas[c.threshold] = deltas[c.threshold]
      detectedPatterns.push({
        pattern_id: pattern.id,
        name: pattern.name,
        description: pattern.description,
        guidance: pattern.guidance,
        triggering_deltas: triggeringDeltas,
      })
    }
  }
  detectedPatterns.sort((a, b) => {
    const sumA = Object.values(a.triggering_deltas).reduce((s, v) => s + v, 0)
    const sumB = Object.values(b.triggering_deltas).reduce((s, v) => s + v, 0)
    return sumB - sumA
  })

  return { deltas, friction_scores: frictionScores, zone_classifications: zoneClassifications, alignment_highlights: alignmentHighlights, tension_highlights: tensionHighlights, detected_patterns: detectedPatterns }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const userClient = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: { user } } = await userClient.auth.getUser()
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const adminClient = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { pairing_id } = await req.json()

    if (!pairing_id) {
      return new Response(JSON.stringify({ error: 'pairing_id is required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const { data: pairing } = await adminClient.from('pairings').select('*').eq('id', pairing_id).single()
    if (!pairing) {
      return new Response(JSON.stringify({ error: 'Pairing not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (pairing.user_a_id !== user.id && pairing.user_b_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Not authorized' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (!['accepted', 'active'].includes(pairing.status)) {
      return new Response(JSON.stringify({ error: 'Pairing not ready' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const [{ data: profileA }, { data: profileB }] = await Promise.all([
      adminClient.from('threshold_profiles').select('*').eq('user_id', pairing.user_a_id).order('profile_version', { ascending: false }).limit(1).single(),
      adminClient.from('threshold_profiles').select('*').eq('user_id', pairing.user_b_id).order('profile_version', { ascending: false }).limit(1).single(),
    ])

    if (!profileA || !profileB) {
      return new Response(JSON.stringify({ error: 'Both users must have completed the quiz' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const comparison = computeComparison(profileA, profileB)

    const { data: result, error: upsertError } = await adminClient
      .from('comparison_results')
      .upsert({ pairing_id, ...comparison, computed_at: new Date().toISOString() }, { onConflict: 'pairing_id' })
      .select()
      .single()

    if (upsertError) {
      return new Response(JSON.stringify({ error: 'Failed to save results' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    await adminClient.from('pairings').update({ status: 'active' }).eq('id', pairing_id)

    return new Response(JSON.stringify({ comparison: result }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (_err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
