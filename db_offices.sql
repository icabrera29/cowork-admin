-- Execute this script in your Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.offices (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price_per_hour numeric NOT NULL,
  details text NOT NULL,
  type text NOT NULL,
  capacity integer NOT NULL,
  status text NOT NULL DEFAULT 'Disponible',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT offices_pkey PRIMARY KEY (id)
);
