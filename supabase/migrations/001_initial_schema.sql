-- ============================================================
-- THRESHOLD — Initial Schema
-- ============================================================

-- profiles: extends Supabase Auth users
CREATE TABLE public.profiles (
  id              uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name    text        NOT NULL,
  avatar_url      text,
  quiz_completed  boolean     NOT NULL DEFAULT false,
  quiz_completed_at timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- quiz_responses: one row per scenario per quiz attempt
CREATE TABLE public.quiz_responses (
  id               uuid       PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid       NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  scenario_number  smallint   NOT NULL CHECK (scenario_number BETWEEN 1 AND 30),
  selected_option  char(1)    NOT NULL CHECK (selected_option IN ('A','B','C','D')),
  response_version smallint   NOT NULL DEFAULT 1,
  created_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, scenario_number, response_version)
);

-- threshold_profiles: computed 0–100 scores for all 15 thresholds
CREATE TABLE public.threshold_profiles (
  id                      uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid          NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  emotional_tolerance     numeric(5,2)  NOT NULL CHECK (emotional_tolerance BETWEEN 0 AND 100),
  vulnerability_readiness numeric(5,2)  NOT NULL CHECK (vulnerability_readiness BETWEEN 0 AND 100),
  empathic_bandwidth      numeric(5,2)  NOT NULL CHECK (empathic_bandwidth BETWEEN 0 AND 100),
  stubbornness            numeric(5,2)  NOT NULL CHECK (stubbornness BETWEEN 0 AND 100),
  confrontation_comfort   numeric(5,2)  NOT NULL CHECK (confrontation_comfort BETWEEN 0 AND 100),
  recovery_speed          numeric(5,2)  NOT NULL CHECK (recovery_speed BETWEEN 0 AND 100),
  directness              numeric(5,2)  NOT NULL CHECK (directness BETWEEN 0 AND 100),
  listening_patience      numeric(5,2)  NOT NULL CHECK (listening_patience BETWEEN 0 AND 100),
  interpretation_charity  numeric(5,2)  NOT NULL CHECK (interpretation_charity BETWEEN 0 AND 100),
  decision_independence   numeric(5,2)  NOT NULL CHECK (decision_independence BETWEEN 0 AND 100),
  standards_imposition    numeric(5,2)  NOT NULL CHECK (standards_imposition BETWEEN 0 AND 100),
  personal_space_needs    numeric(5,2)  NOT NULL CHECK (personal_space_needs BETWEEN 0 AND 100),
  criticism_receptivity   numeric(5,2)  NOT NULL CHECK (criticism_receptivity BETWEEN 0 AND 100),
  responsibility_ownership numeric(5,2) NOT NULL CHECK (responsibility_ownership BETWEEN 0 AND 100),
  change_willingness      numeric(5,2)  NOT NULL CHECK (change_willingness BETWEEN 0 AND 100),
  profile_version         smallint      NOT NULL DEFAULT 1,
  computed_at             timestamptz   NOT NULL DEFAULT now(),
  UNIQUE (user_id, profile_version)
);

-- pairings: links two users for comparison
CREATE TABLE public.pairings (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a_id    uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_b_id    uuid        REFERENCES public.profiles(id) ON DELETE SET NULL,
  invite_code  text        NOT NULL UNIQUE,
  status       text        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','active','expired')),
  label        text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  accepted_at  timestamptz,
  expires_at   timestamptz NOT NULL DEFAULT (now() + INTERVAL '30 days')
);

-- comparison_results: deltas, friction, patterns for a pairing
CREATE TABLE public.comparison_results (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  pairing_id            uuid        NOT NULL UNIQUE REFERENCES public.pairings(id) ON DELETE CASCADE,
  deltas                jsonb       NOT NULL,
  friction_scores       jsonb       NOT NULL,
  zone_classifications  jsonb       NOT NULL,
  detected_patterns     jsonb       NOT NULL,
  alignment_highlights  jsonb       NOT NULL,
  tension_highlights    jsonb       NOT NULL,
  computed_at           timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_quiz_responses_user_id        ON public.quiz_responses (user_id);
CREATE INDEX idx_threshold_profiles_user_id    ON public.threshold_profiles (user_id);
CREATE INDEX idx_pairings_invite_code          ON public.pairings (invite_code);
CREATE INDEX idx_pairings_user_a_id            ON public.pairings (user_a_id);
CREATE INDEX idx_pairings_user_b_id            ON public.pairings (user_b_id);

-- ============================================================
-- ROW-LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threshold_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pairings           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparison_results ENABLE ROW LEVEL SECURITY;

-- Helper: check if current user is paired with a given user_id
CREATE OR REPLACE FUNCTION public.is_paired_with(other_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.pairings
    WHERE (user_a_id = auth.uid() AND user_b_id = other_user_id)
       OR (user_b_id = auth.uid() AND user_a_id = other_user_id)
  )
$$;

-- profiles policies
CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR public.is_paired_with(id)
  );

CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- quiz_responses policies
CREATE POLICY "quiz_responses_select" ON public.quiz_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "quiz_responses_insert" ON public.quiz_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- threshold_profiles policies
CREATE POLICY "threshold_profiles_select" ON public.threshold_profiles
  FOR SELECT USING (
    auth.uid() = user_id OR public.is_paired_with(user_id)
  );

CREATE POLICY "threshold_profiles_insert" ON public.threshold_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "threshold_profiles_update" ON public.threshold_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- pairings policies
CREATE POLICY "pairings_select" ON public.pairings
  FOR SELECT USING (
    auth.uid() = user_a_id OR auth.uid() = user_b_id
  );

CREATE POLICY "pairings_insert" ON public.pairings
  FOR INSERT WITH CHECK (auth.uid() = user_a_id);

CREATE POLICY "pairings_update_accept" ON public.pairings
  FOR UPDATE USING (
    auth.uid() = user_b_id AND status = 'pending'
  );

-- comparison_results policies
CREATE POLICY "comparison_results_select" ON public.comparison_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.pairings p
      WHERE p.id = pairing_id
        AND (p.user_a_id = auth.uid() OR p.user_b_id = auth.uid())
    )
  );

CREATE POLICY "comparison_results_insert" ON public.comparison_results
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.pairings p
      WHERE p.id = pairing_id
        AND (p.user_a_id = auth.uid() OR p.user_b_id = auth.uid())
    )
  );

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
