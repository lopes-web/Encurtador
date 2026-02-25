import { supabase } from '@/lib/supabase';
import { redirect, notFound } from 'next/navigation';

interface Props {
    params: Promise<{ code: string }> | { code: string };
}

export default async function RedirectPage({ params }: Props) {
    const { code } = await params;

    if (!code) {
        notFound();
    }

    // 1. Buscar a URL original
    const { data, error } = await supabase
        .from('urls')
        .select('original_url, clicks')
        .eq('short_code', code)
        .single();

    if (error || !data) {
        notFound();
    }

    // 2. Incrementar o contador de cliques de forma assíncrona (não bloqueia o redirecionamento)
    // Nota: Em uma aplicação real de alta escala, usaríamos um procedimento armazenado ou log de eventos
    // Mas para este escopo, um update direto é suficiente.
    await supabase
        .from('urls')
        .update({ clicks: (data.clicks || 0) + 1 })
        .eq('short_code', code);

    // 3. Redirecionar
    redirect(data.original_url);
}
