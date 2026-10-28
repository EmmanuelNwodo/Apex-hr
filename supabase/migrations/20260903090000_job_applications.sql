create table if not exists public.applications (
  id uuid primary key,
  idempotency_key uuid not null unique,
  first_name text not null,
  last_name text not null,
  candidate_email text not null,
  phone text not null,
  linkedin_url text,
  cover_letter text,
  additional_message text,
  job_external_id text not null,
  job_title text not null,
  job_slug text not null,
  job_reference text,
  job_path text not null,
  source_path text not null,
  utm_attribution jsonb not null default '{}'::jsonb,
  cv_bucket text not null,
  cv_object_path text not null,
  cv_original_filename text not null,
  cv_detected_mime_type text not null,
  cv_size_bytes bigint not null check (cv_size_bytes > 0 and cv_size_bytes <= 5242880),
  cv_checksum text not null,
  cv_scan_status text not null default 'pending' check (cv_scan_status in ('pending', 'clean', 'infected', 'failed')),
  status text not null default 'received',
  notification_status text not null default 'pending' check (notification_status in ('pending', 'sent')),
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applications_submitted_at_idx on public.applications (submitted_at desc);
create index if not exists applications_job_slug_idx on public.applications (job_slug);

create table if not exists public.application_consents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  purpose text not null,
  policy_version text not null,
  consent_text_version text not null,
  granted boolean not null,
  recorded_at timestamptz not null,
  withdrawn_at timestamptz,
  source_path text not null,
  created_at timestamptz not null default now(),
  unique (application_id, purpose)
);

create table if not exists public.job_application_rate_limits (
  rate_key text not null check (length(rate_key) = 64),
  window_started_at timestamptz not null,
  request_count integer not null check (request_count > 0),
  primary key (rate_key, window_started_at)
);

alter table public.applications enable row level security;
alter table public.application_consents enable row level security;
alter table public.job_application_rate_limits enable row level security;

create or replace function public.consume_job_application_rate_limit(p_rate_key text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_window timestamptz := date_trunc('minute', now());
  current_count integer;
begin
  if p_rate_key is null or length(p_rate_key) <> 64 then
    return false;
  end if;

  insert into public.job_application_rate_limits (rate_key, window_started_at, request_count)
  values (p_rate_key, current_window, 1)
  on conflict (rate_key, window_started_at)
  do update set request_count = public.job_application_rate_limits.request_count + 1
  returning request_count into current_count;

  delete from public.job_application_rate_limits
  where window_started_at < now() - interval '2 days';

  return current_count <= 5;
end;
$$;

revoke all on function public.consume_job_application_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_job_application_rate_limit(text) to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'apex-hr-candidate-documents',
  'apex-hr-candidate-documents',
  false,
  5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
