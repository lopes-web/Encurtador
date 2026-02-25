-- Execute este SQL no SQL Editor do seu projeto Supabase (https://app.supabase.com)

-- 1. Criar a tabela de URLs
CREATE TABLE IF NOT EXISTS urls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code TEXT UNIQUE NOT NULL,
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar RLS (Row Level Security)
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- 3. Criar políticas básicas 
-- Permitir que qualquer pessoa insira novos links (anon ou autenticado)
CREATE POLICY "Permitir inserção anônima" ON urls
FOR INSERT WITH CHECK (true);

-- Permitir que qualquer pessoa leia as URLs para o redirecionamento
CREATE POLICY "Permitir leitura anônima" ON urls
FOR SELECT USING (true);

-- Permitir que qualquer pessoa atualize o contador de cliques
CREATE POLICY "Permitir atualização de cliques" ON urls
FOR UPDATE USING (true);

-- Criar um índice para otimizar a busca pelo short_code
CREATE INDEX IF NOT EXISTS idx_urls_short_code ON urls(short_code);
