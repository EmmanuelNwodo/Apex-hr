/**
 * Supabase connection configuration. Reads from environment variables and
 * never throws at import time. The service-role key must only ever be read
 * on the server — never import this from a "use client" module.
 *
 * Missing/unresolved: NEXT_PUBLIC_SUPABASE_URL,
 * NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are not yet
 * set — see .env.example and docs/CONTENT-MODEL.md section 28.
 */
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
};

export const isSupabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey);
