-- ============================================================
-- THRESHOLD — RPCs and Realtime
-- ============================================================

-- Drop existing versions first so we can redefine signatures freely.
DROP FUNCTION IF EXISTS public.get_pairing_by_code(text);
DROP FUNCTION IF EXISTS public.accept_pairing(text);

-- get_pairing_by_code: look up a pairing by invite code
-- Needs SECURITY DEFINER because the caller is not yet user_b (not in the pairing row),
-- so normal RLS on pairings would block SELECT.
CREATE OR REPLACE FUNCTION public.get_pairing_by_code(p_code text)
RETURNS TABLE (
  id         uuid,
  status     text,
  expires_at timestamptz,
  user_a_id  uuid,
  user_b_id  uuid
)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT id, status, expires_at, user_a_id, user_b_id
  FROM public.pairings
  WHERE invite_code = p_code;
$$;

-- accept_pairing: atomically accept a pending invite and add the caller as user_b.
-- Returns jsonb with either { pairing_id } on success or { error } on failure.
-- Error values: 'not_found' | 'own_invite' | 'already_used' | 'expired'
CREATE OR REPLACE FUNCTION public.accept_pairing(p_invite_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_pairing public.pairings%ROWTYPE;
  v_caller  uuid := auth.uid();
BEGIN
  SELECT * INTO v_pairing
  FROM public.pairings
  WHERE invite_code = p_invite_code
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'not_found');
  END IF;

  IF v_pairing.user_a_id = v_caller THEN
    RETURN jsonb_build_object('error', 'own_invite');
  END IF;

  IF v_pairing.user_b_id IS NOT NULL THEN
    RETURN jsonb_build_object('error', 'already_used');
  END IF;

  IF v_pairing.expires_at < now() THEN
    RETURN jsonb_build_object('error', 'expired');
  END IF;

  UPDATE public.pairings
  SET user_b_id   = v_caller,
      status      = 'accepted',
      accepted_at = now()
  WHERE id = v_pairing.id;

  RETURN jsonb_build_object('pairing_id', v_pairing.id);
END;
$$;

-- Enable Realtime for the pairings table so clients can subscribe to
-- status changes (e.g. 'accepted' → 'active') via postgres_changes.
ALTER PUBLICATION supabase_realtime ADD TABLE public.pairings;
