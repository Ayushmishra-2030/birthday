-- ===================================================================
-- A WORLD MADE FOR SHREE — COMPLETE SUPABASE SQL SCHEMA & SETUP
-- Run this script in your Supabase SQL Editor if you wish to link Supabase Cloud.
-- ===================================================================

-- 1. Create Storage Bucket for Public Photographs
INSERT INTO storage.buckets (id, name, public)
VALUES ('birthday-photos', 'birthday-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policy: Allow Public Read for anyone (Shree and visitors)
CREATE POLICY "Public Read Access for Scrapbook Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'birthday-photos');

-- Storage Policy: Allow Admin Upload (service role or authenticated admin)
CREATE POLICY "Admin Upload Access for Scrapbook Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'birthday-photos');

-- Storage Policy: Allow Admin Delete
CREATE POLICY "Admin Delete Access for Scrapbook Images"
ON storage.objects FOR DELETE
USING (bucket_id = 'birthday-photos');

-- Storage Policy: Allow Admin Update
CREATE POLICY "Admin Update Access for Scrapbook Images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'birthday-photos');


-- 2. Create Photographs Table
CREATE TABLE IF NOT EXISTS public.photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    caption TEXT NOT NULL,
    image_url TEXT NOT NULL,
    date TEXT,
    category TEXT DEFAULT 'Memories',
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Public Read for photos
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published photos" ON public.photos FOR SELECT USING (true);
CREATE POLICY "Admin can insert photos" ON public.photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update photos" ON public.photos FOR UPDATE USING (true);
CREATE POLICY "Admin can delete photos" ON public.photos FOR DELETE USING (true);


-- 3. Create Letters Table
CREATE TABLE IF NOT EXISTS public.letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT NOT NULL,
    envelope_theme TEXT DEFAULT 'rose',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.letters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read letters" ON public.letters FOR SELECT USING (true);
CREATE POLICY "Admin can manage letters" ON public.letters FOR ALL USING (true);


-- 4. Create Timeline Events Table
CREATE TABLE IF NOT EXISTS public.timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    romantic_note TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Heart',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view timeline" ON public.timeline_events FOR SELECT USING (true);
CREATE POLICY "Admin can manage timeline" ON public.timeline_events FOR ALL USING (true);


-- 5. Create Memory Wall Quotes Table
CREATE TABLE IF NOT EXISTS public.memory_quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote TEXT NOT NULL,
    context TEXT,
    hearts_count INTEGER DEFAULT 1,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.memory_quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view quotes" ON public.memory_quotes FOR SELECT USING (true);
CREATE POLICY "Admin can manage quotes" ON public.memory_quotes FOR ALL USING (true);


-- 6. Create Reasons I Love You Table
CREATE TABLE IF NOT EXISTS public.reasons_love (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT DEFAULT 'Everyday',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.reasons_love ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view reasons" ON public.reasons_love FOR SELECT USING (true);
CREATE POLICY "Admin can manage reasons" ON public.reasons_love FOR ALL USING (true);


-- 7. Create Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view public settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin can manage settings" ON public.site_settings FOR ALL USING (true);

