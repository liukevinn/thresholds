# THRESHOLD — Relationship Dynamics Assessment

## Product Vision

Threshold is a web application that helps couples and friends understand why their interactions sometimes lead to conflict. The core theory: **disagreement itself doesn't cause conflict — asymmetry in behavioral thresholds does.** Every person has different thresholds for traits like patience, stubbornness, directness, and empathy. When two people's thresholds on a given trait are mismatched, friction emerges — not because either person is wrong, but because the gap between them creates a structural dynamic that neither may be aware of.

The product assesses these thresholds through scenario-based questioning, computes numerical profiles across 15 personality dimensions, and generates comparative analysis between two users to identify areas of alignment and potential friction.

---

## Core Theory: Thresholds

- All humans have different **thresholds** for different qualities: patience, courage, stubbornness, kindness, understanding, etc.
- When there is a **dissonance** between two people's thresholds, their values and approach to any topic diverge — even in cordial disagreements.
- Conflict ignites not from the disagreement itself, but from the **gap** between where one person's threshold sits versus the other's on the same quality.
- The **gap is the unit of analysis**, not the individual. Telling someone "you're too stubborn" is an attack. Showing two people they have a 70-point gap on flexibility reframes the same reality as a shared challenge.
- Thresholds have some contextual flexibility (work vs. home vs. friends), but the variance between two different people's ranges is far more significant.
- The more thresholds measured, the more combinations and patterns can be identified, leading to more tailored and actionable insights.

---

## The 15 Thresholds

### Emotional Processing
| # | Threshold | Key | Description |
|---|-----------|-----|-------------|
| 1 | Emotional Tolerance | `emotional_tolerance` | How much emotional intensity someone can handle before shutting down or escalating |
| 2 | Vulnerability Readiness | `vulnerability_readiness` | How willing someone is to expose their own feelings and uncertainties |
| 3 | Empathic Bandwidth | `empathic_bandwidth` | How much capacity someone has to hold space for another person's emotions |

### Conflict Engagement
| # | Threshold | Key | Description |
|---|-----------|-----|-------------|
| 4 | Stubbornness | `stubbornness` | How tightly someone holds their position when challenged |
| 5 | Confrontation Comfort | `confrontation_comfort` | How readily someone addresses problems directly versus avoids them |
| 6 | Recovery Speed | `recovery_speed` | How quickly someone moves past a disagreement and returns to baseline |

### Communication Style
| # | Threshold | Key | Description |
|---|-----------|-----|-------------|
| 7 | Directness | `directness` | How bluntly someone communicates versus how much they soften or imply |
| 8 | Listening Patience | `listening_patience` | How long someone can take in another perspective before needing to respond or react |
| 9 | Interpretation Charity | `interpretation_charity` | Whether someone defaults to assuming good or bad intent |

### Autonomy & Control
| # | Threshold | Key | Description |
|---|-----------|-----|-------------|
| 10 | Decision Independence | `decision_independence` | How much someone needs to consult others versus acting on their own |
| 11 | Standards Imposition | `standards_imposition` | How strongly someone expects others to meet their personal standards |
| 12 | Personal Space Needs | `personal_space_needs` | How much alone time or independence someone requires |

### Accountability & Growth
| # | Threshold | Key | Description |
|---|-----------|-----|-------------|
| 13 | Criticism Receptivity | `criticism_receptivity` | How much feedback someone can absorb before becoming defensive |
| 14 | Responsibility Ownership | `responsibility_ownership` | How readily someone acknowledges their role in a problem |
| 15 | Change Willingness | `change_willingness` | How open someone is to adjusting their behavior when asked |

---

## Quiz Design

### Design Principles

1. **Scenario-based, not self-report.** Instead of "Are you a patient person?" (which triggers social desirability bias), the quiz presents real-life situations and asks what the quiz taker would advise a character to do.
2. **Third-person framing.** All scenarios use recurring characters (Alice and Ben) and ask "What would you tell Alice to do?" This leverages Solomon's Paradox — people reason more wisely about others' problems than their own — and reduces ego-driven answering.
3. **No "right" answers.** Every option is a legitimate human response. Each reveals a different threshold profile without any option being clearly better or worse.
4. **Multi-threshold measurement.** Each scenario measures 3–6 thresholds simultaneously, with weights indicating how strongly the scenario tests each one.
5. **Hidden scoring.** The quiz taker never sees weights, scores, or threshold labels. They just react to situations naturally.

### Quiz Structure

- **30 scenarios** total, organized into 3 batches of 10:
  - **Batch 1 (Scenarios 1–10): Romantic Conflict** — arguments, emotional moments, relationship tensions
  - **Batch 2 (Scenarios 11–20): Daily Life & Logistics** — chores, finances, scheduling, daily decisions
  - **Batch 3 (Scenarios 21–30): Social & External** — friends, family, work stress, external pressures
- **4 response options (A–D)** per scenario
- Each response option carries a score (0–100) for each threshold measured in that scenario

### Weight System

Each threshold assignment in a scenario carries a weight:
- **Weight 3 (Primary):** The scenario directly and strongly measures this threshold
- **Weight 2 (Moderate):** The threshold is clearly present but not the focal point
- **Weight 1 (Light):** The scenario picks up an incidental signal

### Coverage Requirements

- Every threshold appears in **at least 6 scenarios** across the quiz
- Every threshold has **at least 3 primary (weight 3) measurements**
- Every threshold accumulates a **minimum total weight of 12**

### Full Scenario Specification

All 30 scenarios with narratives, options, and scoring tables are documented in `Threshold_Quiz_Specification.docx`. Below is a summary of the threshold distribution across all 30 scenarios:

#### Scenario-to-Threshold Weight Map

| S# | Batch | Primary Thresholds (W3) | Moderate (W2) | Light (W1) |
|----|-------|------------------------|---------------|------------|
| 1 | Romantic | CC, VR, DI | — | SI, EB, ET |
| 2 | Romantic | RS, SI, IC | — | DI, CC, ET |
| 3 | Romantic | ET, ST, PS | — | VR, RS, CC |
| 4 | Romantic | RS, DI, IC | — | VR, CC, SI |
| 5 | Romantic | EB, LP | VR | ET, RO |
| 6 | Romantic | ST, CR | CW | DI, RO |
| 7 | Romantic | ET | EB, RS | LP, PS |
| 8 | Romantic | VR, RO | CC | CW, IC |
| 9 | Romantic | CW | ST, CR | SI, DI |
| 10 | Romantic | DIN, PS | LP | EB, CC |
| 11 | Daily | DIN, DI | ST | SI, LP |
| 12 | Daily | SI, CW | CR | DI, RO |
| 13 | Daily | LP | ET, EB | IC, CC |
| 14 | Daily | RO, CR | IC | RS, ST |
| 15 | Daily | PS | DIN, VR | ET, EB |
| 16 | Daily | CW | DI, SI | ST, RO |
| 17 | Daily | ST | DIN, CC | LP, RS |
| 18 | Daily | IC | EB, LP | ET, VR |
| 19 | Daily | CR | RS, CW | RO, PS |
| 20 | Daily | RO | VR, SI | DIN, IC |
| 21 | Social | EB | PS, ET | IC, LP |
| 22 | Social | IC | CC, DI | CR, ST |
| 23 | Social | DIN | PS, SI | VR, RS |
| 24 | Social | CR | RO, CW | ET, CC |
| 25 | Social | LP | EB, RS | DI, ST |
| 26 | Social | VR | ET, CC | PS, IC |
| 27 | Social | CW | RO, ST | SI, CR |
| 28 | Social | RS | DIN, IC | LP, EB |
| 29 | Social | SI | DI, ST | ET, CW |
| 30 | Social | PS | VR, RO | DIN, RS |

**Abbreviations:** ET=Emotional Tolerance, VR=Vulnerability Readiness, EB=Empathic Bandwidth, ST=Stubbornness, CC=Confrontation Comfort, RS=Recovery Speed, DI=Directness, LP=Listening Patience, IC=Interpretation Charity, DIN=Decision Independence, SI=Standards Imposition, PS=Personal Space Needs, CR=Criticism Receptivity, RO=Responsibility Ownership, CW=Change Willingness

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 14+ (App Router) | Server-side rendering, routing, React components |
| Styling | Tailwind CSS | Utility-first styling, responsive design |
| State Management | React Context + Zustand | Quiz flow state, client-side caching |
| Backend | Supabase | Auth, PostgreSQL database, Edge Functions, Realtime |
| Database | PostgreSQL (via Supabase) | Relational data storage with RLS |
| Compute | Supabase Edge Functions | Scoring algorithm, comparison engine, pattern detection |
| Hosting | Vercel | Next.js deployment, edge network, CI/CD |

---

## Architecture

### Key Design Decisions

1. **Client-side quiz state:** Quiz responses are held in a Zustand store during the session and batch-inserted into the database only upon completion. This avoids 30 individual writes and prevents partial quiz data from polluting the database.
2. **Server-side scoring:** The scoring algorithm runs in a Supabase Edge Function, not client-side. This protects the scoring logic and threshold weights from being visible in the browser, preserving quiz integrity.
3. **Cached computed results:** Threshold profiles and comparison results are stored in their own tables after computation. They are not recalculated on every page load — only when a user retakes the quiz.

### Request Flow

1. User interacts with the Next.js frontend (quiz, dashboard, invite)
2. Frontend communicates with Supabase via the `supabase-js` client library
3. Authentication is handled by Supabase Auth (email/password, OAuth)
4. CRUD operations go through Supabase's PostgREST API with RLS
5. Scoring and comparison computations are triggered via Supabase Edge Functions
6. Results are written back to the database and fetched by the frontend

---

## Database Schema

### `profiles`
Extends Supabase Auth users with application-specific data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, FK → auth.users.id | User identifier |
| display_name | text | NOT NULL | User's display name |
| avatar_url | text | NULLABLE | Profile image URL |
| quiz_completed | boolean | DEFAULT false | Whether quiz is finished |
| quiz_completed_at | timestamptz | NULLABLE | When quiz was completed |
| created_at | timestamptz | DEFAULT now() | Account creation |
| updated_at | timestamptz | DEFAULT now() | Last update |

### `quiz_responses`
Stores each user's selected option per scenario. All 30 rows batch-inserted on completion.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() | Row identifier |
| user_id | uuid | FK → profiles.id, NOT NULL | The quiz taker |
| scenario_number | smallint | NOT NULL, CHECK 1–30 | Which scenario |
| selected_option | char(1) | NOT NULL, CHECK A/B/C/D | Chosen response |
| response_version | smallint | DEFAULT 1 | Quiz version for iterations |
| created_at | timestamptz | DEFAULT now() | When recorded |

**Unique constraint:** `(user_id, scenario_number, response_version)`

### `threshold_profiles`
Computed 0–100 scores for all 15 thresholds. One row per user per quiz version.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() | Row identifier |
| user_id | uuid | FK → profiles.id, NOT NULL | Profile owner |
| emotional_tolerance | numeric(5,2) | NOT NULL, CHECK 0–100 | ET score |
| vulnerability_readiness | numeric(5,2) | NOT NULL, CHECK 0–100 | VR score |
| empathic_bandwidth | numeric(5,2) | NOT NULL, CHECK 0–100 | EB score |
| stubbornness | numeric(5,2) | NOT NULL, CHECK 0–100 | ST score |
| confrontation_comfort | numeric(5,2) | NOT NULL, CHECK 0–100 | CC score |
| recovery_speed | numeric(5,2) | NOT NULL, CHECK 0–100 | RS score |
| directness | numeric(5,2) | NOT NULL, CHECK 0–100 | DI score |
| listening_patience | numeric(5,2) | NOT NULL, CHECK 0–100 | LP score |
| interpretation_charity | numeric(5,2) | NOT NULL, CHECK 0–100 | IC score |
| decision_independence | numeric(5,2) | NOT NULL, CHECK 0–100 | DIN score |
| standards_imposition | numeric(5,2) | NOT NULL, CHECK 0–100 | SI score |
| personal_space_needs | numeric(5,2) | NOT NULL, CHECK 0–100 | PS score |
| criticism_receptivity | numeric(5,2) | NOT NULL, CHECK 0–100 | CR score |
| responsibility_ownership | numeric(5,2) | NOT NULL, CHECK 0–100 | RO score |
| change_willingness | numeric(5,2) | NOT NULL, CHECK 0–100 | CW score |
| profile_version | smallint | DEFAULT 1 | Matches quiz version |
| computed_at | timestamptz | DEFAULT now() | When generated |

### `pairings`
Links two users for comparison.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() | Pairing identifier |
| user_a_id | uuid | FK → profiles.id, NOT NULL | Invite initiator |
| user_b_id | uuid | FK → profiles.id, NULLABLE | Invited user (null until accepted) |
| invite_code | text | UNIQUE, NOT NULL | 8-char alphanumeric code |
| status | text | DEFAULT 'pending' | pending / accepted / active / expired |
| label | text | NULLABLE | User-defined label (e.g. "Me & Sarah") |
| created_at | timestamptz | DEFAULT now() | When invite generated |
| accepted_at | timestamptz | NULLABLE | When accepted |
| expires_at | timestamptz | NOT NULL | Expiration (default 30 days) |

### `comparison_results`
Computed deltas, friction scores, and detected patterns for a pairing.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() | Result identifier |
| pairing_id | uuid | FK → pairings.id, UNIQUE, NOT NULL | Which pairing |
| deltas | jsonb | NOT NULL | Raw deltas: `{ threshold_key: number }` |
| friction_scores | jsonb | NOT NULL | Adjusted scores: `{ threshold_key: number }` |
| zone_classifications | jsonb | NOT NULL | Per-threshold zone |
| detected_patterns | jsonb | NOT NULL | Array of pattern objects |
| alignment_highlights | jsonb | NOT NULL | Top 3 alignment areas |
| tension_highlights | jsonb | NOT NULL | Top 3 friction areas |
| computed_at | timestamptz | DEFAULT now() | When generated |

### Relationships
```
auth.users → profiles (1:1)
profiles → quiz_responses (1:many, 30 per attempt)
profiles → threshold_profiles (1:1 per version)
profiles → pairings (1:many, as user_a or user_b)
pairings → comparison_results (1:1)
```

---

## Scoring Algorithm

### Scoring Configuration

The scoring config is a static data structure stored **server-side only** (within Edge Functions) that maps every scenario to its measured thresholds, weights, and per-option scores.

```typescript
type ScoringConfig = {
  [scenarioNumber: number]: {
    thresholds: {
      [thresholdKey: string]: {
        weight: 1 | 2 | 3;
        scores: { A: number; B: number; C: number; D: number };
      }
    }
  }
};
```

The full scoring configuration with all values is in `Threshold_Quiz_Specification.docx`.

### Computation

```
for each threshold in ALL_THRESHOLDS:
    weighted_sum = 0
    total_weight = 0

    for each scenario in SCORING_CONFIG:
        if threshold exists in scenario.thresholds:
            config = scenario.thresholds[threshold]
            selected = user_responses[scenario.number]    // 'A', 'B', 'C', or 'D'
            score = config.scores[selected]               // 0–100
            weight = config.weight                        // 1, 2, or 3

            weighted_sum += score * weight
            total_weight += weight

    final_score = weighted_sum / total_weight              // normalized 0–100
```

### Behavioral Descriptor Ranges

| Range | Label | Meaning |
|-------|-------|---------|
| 0–25 | Low | This trait is not a strong part of how you engage |
| 26–50 | Moderate-Low | You lean away from this trait in most situations |
| 51–75 | Moderate-High | You lean toward this trait in most situations |
| 76–100 | High | This trait is a defining part of how you engage |

### Edge Function: `compute-profile`

```
POST /functions/v1/compute-profile
Auth: Requires valid Supabase JWT
Body: { user_id: string, response_version?: number }
Returns: { profile: ThresholdProfile } | { error: string }

Steps:
1. Verify JWT matches requested user_id
2. Load quiz_responses for user_id + version
3. Validate 30 complete responses exist
4. Run scoring algorithm
5. Upsert threshold_profiles row
6. Update profiles.quiz_completed = true
7. Return computed profile
```

---

## Comparison Engine

### Delta Calculation

```
for each threshold in ALL_THRESHOLDS:
    delta[threshold] = abs(profile_a[threshold] - profile_b[threshold])
```

### Friction Coefficients

Each threshold has a multiplier reflecting how much real-world conflict a gap produces:

| Threshold | Coefficient | Rationale |
|-----------|-------------|-----------|
| Emotional Tolerance | 1.4 | Gaps escalate quickly under stress |
| Vulnerability Readiness | 1.2 | Affects depth of emotional connection |
| Empathic Bandwidth | 1.1 | Shapes how supported each person feels |
| Stubbornness | 1.4 | High-gap deadlocks are a top conflict driver |
| Confrontation Comfort | 1.5 | Largest asymmetry impact — pursue/withdraw cycles |
| Recovery Speed | 1.3 | Mismatched recovery creates compounding resentment |
| Directness | 1.2 | Communication mismatch causes chronic misunderstanding |
| Listening Patience | 1.0 | Important but rarely escalates alone |
| Interpretation Charity | 1.3 | Low charity amplifies every other friction point |
| Decision Independence | 0.9 | More logistical, less emotionally charged |
| Standards Imposition | 1.2 | Creates persistent low-grade control friction |
| Personal Space Needs | 1.0 | Manageable with awareness, rarely explosive |
| Criticism Receptivity | 1.3 | Gaps block growth conversations entirely |
| Responsibility Ownership | 1.2 | Accountability gaps erode trust over time |
| Change Willingness | 1.1 | Important long-term but slower impact |

```
friction_score[threshold] = delta[threshold] * coefficient[threshold]
```

### Zone Classification

| Zone | Delta Range | Description |
|------|-------------|-------------|
| Alignment | 0–20 | Unlikely to cause friction; natural compatibility |
| Awareness | 21–45 | Differences exist; worth understanding but manageable |
| Tension | 46–100 | Recurring friction likely; highest priority for insight |

### Results Presentation

Results are presented **side-by-side and neutral** — no leading with strengths or weaknesses. Both profiles displayed on the same axis for each threshold. The gap between them is visually highlighted without labeling it as good or bad.

- **Tension Highlights:** Top 3 thresholds by adjusted friction score
- **Alignment Highlights:** Bottom 3 thresholds by raw delta

### Edge Function: `compute-comparison`

```
POST /functions/v1/compute-comparison
Auth: Requires valid Supabase JWT
Body: { pairing_id: string }
Returns: { comparison: ComparisonResult } | { error: string }

Steps:
1. Verify JWT belongs to user_a or user_b in the pairing
2. Verify pairing status is 'active'
3. Load threshold_profiles for both users
4. Calculate deltas for all 15 thresholds
5. Apply friction coefficients
6. Classify zones
7. Extract alignment and tension highlights
8. Run pattern detection
9. Upsert comparison_results row
10. Return full comparison result
```

---

## Pattern Detection Engine

Patterns identify compound dynamics where multiple threshold gaps interact to produce a specific, recognizable relationship dynamic. A pattern fires when **all** of its conditions are met. Multiple patterns can fire for the same couple.

### Pattern Library

#### 1. The Pursue-Withdraw Cycle
- **Conditions:** Confrontation Comfort delta ≥ 40 AND Recovery Speed delta ≥ 30
- **Description:** One partner pushes to resolve conflict immediately while the other needs space. The pursuer interprets withdrawal as avoidance; the withdrawer interprets pursuit as aggression. Self-reinforcing loop.
- **Guidance:** Establish a pause protocol: the withdrawer commits to naming when they need space and setting a specific time to revisit. The pursuer commits to honoring that timeline without follow-up pressure.

#### 2. The Deadlock Dynamic
- **Conditions:** Stubbornness delta ≥ 35 AND Listening Patience delta ≥ 30
- **Description:** Both hold firm positions, but one has significantly less patience for hearing the other out. Arguments stall in circular loops.
- **Guidance:** Use structured turn-taking: each person gets uninterrupted time to state their full position. Consider writing positions down to remove real-time debate pressure.

#### 3. The Hidden Hurt Pattern
- **Conditions:** Vulnerability Readiness delta ≥ 40 AND Interpretation Charity delta ≥ 35
- **Description:** One partner buries feelings while the other assumes the worst when something feels off, creating phantom conflicts from misread signals.
- **Guidance:** The less vulnerable partner should flag emotions early: "Something is bothering me but I need time to articulate it." The less charitable partner should ask before assuming.

#### 4. The Standards Collision
- **Conditions:** Standards Imposition delta ≥ 35 AND Criticism Receptivity delta ≥ 35
- **Description:** One partner has strong expectations; the other becomes defensive when those expectations are expressed. Creates a cycle of undeliverable feedback.
- **Guidance:** Reframe standards as preferences ("I prefer") rather than rules ("You should"). Practice hearing feedback as information rather than judgment.

#### 5. The Emotional Overload
- **Conditions:** Emotional Tolerance delta ≥ 40 AND Empathic Bandwidth delta ≥ 35
- **Description:** One processes emotions at high intensity while the other has limited capacity to absorb. The emotional partner feels unsupported; the other shuts down.
- **Guidance:** Agree on emotional check-ins with defined time boundaries. Signal the level of support needed: "I just need you to listen for five minutes" vs. "I need your advice."

#### 6. The Independence Friction
- **Conditions:** Decision Independence delta ≥ 40 AND Personal Space Needs delta ≥ 30
- **Description:** One values autonomy and solo decisions; the other expects joint involvement. Manifests as decisions made without consultation and uncoordinated time apart.
- **Guidance:** Define domains of independent vs. shared decision-making explicitly. Some categories require consultation; others are autonomous. Make boundaries explicit rather than assumed.

#### 7. The Accountability Gap
- **Conditions:** Responsibility Ownership delta ≥ 35 AND Change Willingness delta ≥ 30
- **Description:** One readily acknowledges their role in problems; the other deflects and resists change. Creates one-sided effort and growing resentment.
- **Guidance:** Implement a mutual feedback ritual — regular check-ins where both share one appreciation and one area to work on. Frame change as mutual and ongoing.

#### 8. The Communication Mismatch
- **Conditions:** Directness delta ≥ 40 AND Vulnerability Readiness delta ≥ 30
- **Description:** One is blunt and explicit; the other communicates indirectly. Important messages get lost in translation.
- **Guidance:** The direct partner should lead with intent: "I'm bringing this up because I care, not to attack." The indirect partner should practice stating needs as clear requests.

### Detection Algorithm

```
detected_patterns = []

for each pattern in PATTERN_LIBRARY:
    all_conditions_met = true

    for each condition in pattern.conditions:
        if delta[condition.threshold] < condition.min_delta:
            all_conditions_met = false
            break

    if all_conditions_met:
        detected_patterns.append({
            pattern_id: pattern.id,
            name: pattern.name,
            description: pattern.description,
            guidance: pattern.guidance,
            triggering_deltas: relevant delta values
        })

// Sort by combined triggering delta magnitude (most severe first)
detected_patterns.sort(by: sum of triggering deltas, descending)
```

---

## User Flows

### Flow A: First-Time User (Quiz Taker)
1. User lands on homepage → sees value prop and "Take the Quiz" CTA
2. Clicks CTA → prompted to create account (email/password or OAuth via Supabase Auth)
3. Enters quiz flow → Scenario 1 of 30, progress bar, 4 options per scenario
4. Progresses through all 30 → responses held in client-side Zustand (intentionally not persisted until completion)
5. After Scenario 30 → "Complete Quiz" confirmation → batch insert all 30 responses
6. `compute-profile` Edge Function runs → threshold profile stored
7. Redirected to individual profile view → 15 threshold scores with descriptors → "Invite Your Partner" CTA

### Flow B: Invite & Pairing
1. User A clicks "Invite Your Partner" → system generates 8-char invite code
2. Pairings row created with status `pending` → invite link: `threshold.app/invite/[code]`
3. User A shares link (copy-to-clipboard, native share)
4. User B opens link → creates account if needed → invite accepted → `user_b_id` set, status → `accepted`
5. User B takes quiz (same as Flow A steps 3–6)
6. On completion → pairing status → `active` → `compute-comparison` triggered automatically
7. Both users get access to comparison dashboard → User A notified via Supabase Realtime

### Flow C: Viewing Comparison Results
1. Navigate to comparison dashboard
2. **Section 1 — Side-by-Side Profile:** All 15 thresholds with both bars on same axis, color-coded by zone
3. **Section 2 — Alignment Highlights:** Top 3 closest thresholds with positive descriptors
4. **Section 3 — Tension Highlights:** Top 3 largest gaps with friction descriptors
5. **Section 4 — Detected Patterns:** Compound patterns with names, descriptions, triggering deltas, and guidance

### Flow D: Retake Quiz
1. User selects "Retake Quiz" from profile
2. Confirmation modal warns about overwriting current profile/comparison
3. `response_version` incremented → quiz restarts
4. On completion → new profile generated → comparison auto-recomputed if pairing exists

---

## Frontend Architecture

### Route Structure (Next.js App Router)

| Route | Auth | Description |
|-------|------|-------------|
| `/` | No | Landing page |
| `/auth/login` | No | Login |
| `/auth/signup` | No | Account creation |
| `/quiz` | Yes | Quiz container with progress |
| `/quiz/[number]` | Yes | Individual scenario (1–30) |
| `/quiz/complete` | Yes | Confirmation and submission |
| `/profile` | Yes | Individual threshold profile |
| `/invite` | Yes | Generate invite link |
| `/invite/[code]` | Partial | Accept invite |
| `/compare/[pairingId]` | Yes | Comparison dashboard |
| `/settings` | Yes | Account settings, retake |

### Component Tree

**Quiz Components:**
- `QuizProvider` — React Context wrapping quiz flow, manages Zustand store
- `ScenarioCard` — Displays one scenario: narrative, question, four options
- `OptionButton` — Individual response option with selection state
- `QuizProgress` — Progress bar with scenario count and batch indicator
- `QuizNav` — Back/Next navigation (Next disabled until option selected)

**Profile Components:**
- `ThresholdBar` — Single horizontal bar (0–100) with name, score, descriptor
- `ThresholdGroup` — Groups related thresholds with group header
- `ProfileView` — Full 15-threshold profile layout (five ThresholdGroups)

**Comparison Components:**
- `ComparisonBar` — Dual-bar for one threshold, both scores on same axis, gap indicator
- `ComparisonGrid` — Full 15-threshold comparison layout
- `HighlightCard` — One alignment or tension highlight with scores and interpretation
- `PatternCard` — One detected pattern with name, description, deltas, guidance
- `ComparisonDashboard` — Full page: ComparisonGrid + HighlightCards + PatternCards

**Shared Components:**
- `InviteLinkGenerator` — Creates code, shareable link with copy/share buttons
- `AuthGuard` — Route protection, redirects to login if unauthenticated
- `NotificationBanner` — Realtime notification when partner completes quiz

### State Management

**Zustand Store (Quiz):**
```typescript
interface QuizStore {
  responses: Record<number, 'A' | 'B' | 'C' | 'D'>;
  currentScenario: number;
  isComplete: boolean;
  setResponse: (scenario: number, option: string) => void;
  goNext: () => void;
  goBack: () => void;
  reset: () => void;
}
```

**Server State:** All persistent data fetched via Supabase client. Use TanStack Query for client-side caching on interactive pages. No global store for server data.

---

## Security & Access Control

### Row-Level Security Policies

| Table | Operation | Rule |
|-------|-----------|------|
| profiles | SELECT | Own profile OR paired user's profile |
| profiles | UPDATE | Own profile only |
| quiz_responses | SELECT | Own responses only |
| quiz_responses | INSERT | Own responses only |
| threshold_profiles | SELECT | Own profile OR paired user's profile |
| pairings | SELECT | Must be user_a or user_b |
| pairings | INSERT | Must be user_a |
| pairings | UPDATE | Must be user_b AND status = 'pending' |
| comparison_results | SELECT | Must be in the associated pairing |

### Additional Security
- **Scoring integrity:** Scoring config stored server-side only (Edge Functions), never exposed to client
- **Invite security:** 8-char crypto-random codes, 30-day expiry, single-use, max 5 active per user
- **Data privacy:** Quiz responses never visible to partner — only computed profiles and comparisons. Individual scenario answers remain private.
- **GDPR:** Users can delete account and all associated data

---

## Project Structure

```
threshold/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── page.tsx                       # Landing page
│   │   ├── layout.tsx                     # Root layout with providers
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── quiz/
│   │   │   ├── layout.tsx                 # Quiz layout with QuizProvider
│   │   │   ├── page.tsx                   # Quiz intro
│   │   │   ├── [number]/page.tsx          # Individual scenario
│   │   │   └── complete/page.tsx          # Completion & submission
│   │   ├── profile/
│   │   │   └── page.tsx                   # Individual threshold profile
│   │   ├── invite/
│   │   │   ├── page.tsx                   # Generate invite
│   │   │   └── [code]/page.tsx            # Accept invite
│   │   ├── compare/
│   │   │   └── [pairingId]/page.tsx       # Comparison dashboard
│   │   └── settings/
│   │       └── page.tsx                   # Account settings
│   ├── components/
│   │   ├── quiz/
│   │   │   ├── ScenarioCard.tsx
│   │   │   ├── OptionButton.tsx
│   │   │   ├── QuizProgress.tsx
│   │   │   └── QuizNav.tsx
│   │   ├── profile/
│   │   │   ├── ThresholdBar.tsx
│   │   │   ├── ThresholdGroup.tsx
│   │   │   └── ProfileView.tsx
│   │   ├── comparison/
│   │   │   ├── ComparisonBar.tsx
│   │   │   ├── ComparisonGrid.tsx
│   │   │   ├── HighlightCard.tsx
│   │   │   ├── PatternCard.tsx
│   │   │   └── ComparisonDashboard.tsx
│   │   └── shared/
│   │       ├── AuthGuard.tsx
│   │       ├── InviteLinkGenerator.tsx
│   │       └── NotificationBanner.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                  # Browser Supabase client
│   │   │   ├── server.ts                  # Server-side Supabase client
│   │   │   └── middleware.ts              # Auth middleware
│   │   ├── constants/
│   │   │   ├── thresholds.ts              # Threshold metadata (names, groups, descriptors)
│   │   │   └── scenarios.ts               # Scenario content (narratives, options — NO scores)
│   │   └── utils/
│   │       └── helpers.ts
│   ├── stores/
│   │   └── quizStore.ts                   # Zustand quiz state
│   └── types/
│       ├── database.ts                    # Generated Supabase types
│       ├── quiz.ts
│       └── comparison.ts
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql         # Tables, RLS, indexes
│   ├── functions/
│   │   ├── compute-profile/
│   │   │   └── index.ts                   # Scoring algorithm
│   │   └── compute-comparison/
│   │       └── index.ts                   # Comparison + pattern detection
│   ├── seed.sql                           # Dev seed data
│   └── config.toml
├── public/
├── tailwind.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── .env.local
```

---

## Implementation Phases

### Phase 1: Foundation
- Initialize Next.js with TypeScript + Tailwind
- Set up Supabase project, configure auth
- Create database migration (all tables, RLS, indexes)
- Implement auth flow (signup, login, logout)
- Build AuthGuard and route protection middleware

### Phase 2: Quiz Flow
- Build Zustand quiz store
- Create ScenarioCard and OptionButton components
- Implement quiz routing with progress tracking
- Build quiz completion and batch submission
- Deploy `compute-profile` Edge Function with full scoring config

### Phase 3: Individual Profile
- Build ThresholdBar and ProfileView components
- Implement behavioral descriptor mapping
- Create profile page displaying results after completion

### Phase 4: Pairing & Invite
- Build invite code generation and InviteLinkGenerator
- Create invite acceptance flow
- Implement pairing status management (pending → accepted → active)
- Set up Supabase Realtime for partner completion notification

### Phase 5: Comparison Dashboard
- Deploy `compute-comparison` Edge Function (deltas, friction, zones, patterns)
- Build ComparisonBar, ComparisonGrid, HighlightCard, PatternCard
- Create ComparisonDashboard page
- Implement NotificationBanner for realtime updates

### Phase 6: Polish & Launch
- Landing page design and copy
- Responsive design pass
- Error handling and edge cases
- Loading states and skeleton screens
- SEO and Open Graph metadata
- Analytics integration
- Production deployment

---

## Reference Documents

- `Threshold_Quiz_Specification.docx` — All 30 scenarios with narratives, options, and complete scoring tables
- `Threshold_System_Design.docx` — Full technical architecture with detailed tables and pseudocode
