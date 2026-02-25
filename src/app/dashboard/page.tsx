import { supabase } from '@/lib/supabase';
import { UrlEntry } from '@/types';
import { BarChart3, ArrowLeft, ExternalLink, Calendar, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const { data: urls, error } = await supabase
        .from('urls')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao buscar URLs:', error);
    }

    return (
        <main className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-12">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar ao Início
                        </Link>
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <BarChart3 className="w-8 h-8 text-indigo-400" />
                            Métricas de Links
                        </h1>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-sm">
                        <span className="text-zinc-500 text-sm block mb-1">Total de Links</span>
                        <span className="text-2xl font-bold">{urls?.length || 0}</span>
                    </div>
                </header>

                <section className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.02]">
                                    <th className="px-6 py-5 text-zinc-500 font-medium text-sm">URL Encurtada</th>
                                    <th className="px-6 py-5 text-zinc-500 font-medium text-sm">URL Original</th>
                                    <th className="px-6 py-5 text-zinc-500 font-medium text-sm">Criado em</th>
                                    <th className="px-6 py-5 text-zinc-500 font-medium text-sm text-right">Cliques</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {urls && urls.length > 0 ? (
                                    urls.map((url: UrlEntry) => (
                                        <tr key={url.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-indigo-400 font-mono text-sm">/{url.short_code}</span>
                                                    <span className="text-zinc-500 text-xs truncate max-w-[200px]">
                                                        {url.short_code}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <a
                                                    href={url.original_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-zinc-300 hover:text-white transition-colors text-sm flex items-center gap-2 truncate max-w-[300px]"
                                                >
                                                    {url.original_url}
                                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </a>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(url.created_at).toLocaleDateString('pt-BR')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl font-bold border border-indigo-500/20">
                                                    <MousePointer2 className="w-4 h-4" />
                                                    {url.clicks}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                            Nenhum link encurtado encontrado.
                                            <Link href="/" className="text-indigo-400 hover:underline ml-1">Crie o primeiro agora!</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
