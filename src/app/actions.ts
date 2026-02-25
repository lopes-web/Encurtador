'use server'

import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';

export async function shortenUrl(formData: FormData) {
    const originalUrl = formData.get('url') as string;

    if (!originalUrl) {
        return { error: 'URL é obrigatória' };
    }

    // Validar URL básica
    try {
        new URL(originalUrl);
    } catch (e) {
        return { error: 'URL inválida' };
    }

    const shortCode = nanoid(6);

    const { data, error } = await supabase
        .from('urls')
        .insert([{ original_url: originalUrl, short_code: shortCode }])
        .select()
        .single();

    if (error) {
        console.error('Erro ao inserir URL:', error);
        return { error: 'Erro ao criar link encurtador' };
    }

    revalidatePath('/');
    revalidatePath('/dashboard');

    return { data };
}
