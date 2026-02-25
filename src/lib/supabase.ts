import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'seu_url_aqui') {
    console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL não está configurado em .env.local');
}

if (!supabaseAnonKey || supabaseAnonKey === 'sua_chave_aqui') {
    console.warn('⚠️ NEXT_PUBLIC_SUPABASE_ANON_KEY não está configurado em .env.local');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

