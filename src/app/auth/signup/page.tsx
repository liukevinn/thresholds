'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/quiz'
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push(next)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <p className="label-caps mb-6">Threshold</p>
        <h1 className="heading text-3xl text-foreground mb-1">create your account</h1>
        <p className="text-sm text-muted-foreground mb-8">take the quiz to understand your relationship dynamics</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">your name</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              placeholder="first name or nickname"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              placeholder="at least 6 characters"
            />
          </div>

          {error && <p className="text-sm text-tension">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'creating account...' : 'create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          already have an account?{' '}
          <Link
            href={next !== '/quiz' ? `/auth/login?next=${encodeURIComponent(next)}` : '/auth/login'}
            className="text-foreground font-medium hover:underline"
          >
            sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SignupForm />
    </Suspense>
  )
}
