import { isSupabaseConfigured } from "./config";

/**
 * Operational data boundary for employer leads, candidates, applications
 * and consent (docs/CONTENT-MODEL.md section 16). The `@supabase/supabase-js`
 * package is not installed yet — no live queries run in this phase. This
 * stub exists so feature code (find-talent, jobs, talent-pool) can be built
 * against a stable interface once the project URL and keys are confirmed.
 *
 * Row Level Security must be enabled on every table before this client is
 * used against a real project — do not ship a service-role key to the browser.
 */
export interface OperationalDataClient {
  isConfigured(): boolean;
}

class UnconfiguredOperationalDataClient implements OperationalDataClient {
  isConfigured(): boolean {
    return isSupabaseConfigured;
  }
}

export const operationalDataClient: OperationalDataClient =
  new UnconfiguredOperationalDataClient();
