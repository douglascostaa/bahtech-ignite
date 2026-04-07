-- Tabela de usuários do Slides
CREATE TABLE IF NOT EXISTS slides_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Inserir os 3 usuários
INSERT INTO slides_users (email, password, name, role) VALUES
  ('douglas.costa@bahtech.com.br', 'Bah@2026d', 'Douglas Costa', 'superadmin'),
  ('lucas.dettenborn@bahtech.com.br', 'Bah#Luc4s', 'Lucas Dettenborn', 'admin'),
  ('jorge.augusto@bahtech.com.br', 'Bah!J0rge', 'Jorge Augusto', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Apresentações
CREATE TABLE IF NOT EXISTS slides_presentations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  theme TEXT NOT NULL DEFAULT 'bahtech',
  owner_id UUID REFERENCES slides_users(id),
  slide_order INTEGER[] DEFAULT '{}',
  text_overrides JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Versões (histórico)
CREATE TABLE IF NOT EXISTS slides_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  presentation_id UUID REFERENCES slides_presentations(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  snapshot JSONB NOT NULL,
  created_by UUID REFERENCES slides_users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Logs de atividade (superadmin)
CREATE TABLE IF NOT EXISTS slides_activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES slides_users(id),
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: habilitar
ALTER TABLE slides_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE slides_presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE slides_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE slides_activity_logs ENABLE ROW LEVEL SECURITY;

-- Policies: acesso via anon key
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'slides_users_all') THEN
    CREATE POLICY slides_users_all ON slides_users FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'slides_presentations_all') THEN
    CREATE POLICY slides_presentations_all ON slides_presentations FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'slides_versions_all') THEN
    CREATE POLICY slides_versions_all ON slides_versions FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'slides_activity_logs_all') THEN
    CREATE POLICY slides_activity_logs_all ON slides_activity_logs FOR ALL USING (true);
  END IF;
END $$;
