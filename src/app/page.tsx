import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <div className="max-w-lg">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
          Threshold
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-3">
          Conflict doesn&apos;t come from disagreement. It comes from the gap between where two people&apos;s thresholds sit on the same quality.
        </p>
        <p className="text-base text-gray-400 mb-10">
          30 scenarios. 15 dimensions. One comparison that reframes how you understand each other.
        </p>
        <Link
          href="/auth/signup"
          className="inline-block px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
        >
          Take the Quiz
        </Link>
        <p className="mt-4 text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-gray-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
