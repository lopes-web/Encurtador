'use client'

import { useState } from 'react'
import { shortenUrl } from './actions'
import { Link2, Copy, Check, BarChart3, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortened, setShortened] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setShortened(null)

    const formData = new FormData()
    formData.append('url', url)

    const result = await shortenUrl(formData)

    if (result.error) {
      setError(result.error)
    } else if (result.data) {
      const baseUrl = window.location.origin
      setShortened(`${baseUrl}/${result.data.short_code}`)
      setUrl('')
    }
    setLoading(false)
  }

  function copyToClipboard() {
    if (shortened) {
      navigator.clipboard.writeText(shortened)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Link2 className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
            Seus links, mais curtos.
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mx-auto">
            Transforme URLs longas em links memoráveis e acompanhe cada clique em tempo real.
          </p>
        </header>

        <section className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative group transition-all duration-300 hover:border-white/20">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="url"
                required
                placeholder="Cole seu link longo aqui..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">
                <Link2 className="w-5 h-5" />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Encurtar Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {shortened && (
            <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl">
                <div className="bg-[#0a0a0b] p-6 rounded-[15px] flex items-center justify-between gap-4">
                  <span className="text-white font-medium truncate flex-1 text-lg">
                    {shortened}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm font-medium">Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <footer className="mt-12 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium group"
          >
            <BarChart3 className="w-4 h-4" />
            Ver métricas detalhadas
            <span className="w-0 overflow-hidden group-hover:w-auto transition-all transition-duration-300 opacity-0 group-hover:opacity-100 italic ml-1">
              &rarr;
            </span>
          </Link>
        </footer>
      </div>
    </main>
  )
}
