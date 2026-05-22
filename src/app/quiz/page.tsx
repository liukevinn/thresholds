import Link from 'next/link'

export default function QuizIntroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">How this works</h1>
        <div className="text-left bg-gray-50 rounded-2xl p-6 mb-8 space-y-3 text-sm text-gray-600 leading-relaxed">
          <p>You&apos;ll read 30 short scenarios involving two recurring characters, <strong className="text-gray-900">Alice</strong> and <strong className="text-gray-900">Ben</strong>.</p>
          <p>For each one, you&apos;ll be asked what <em>you</em> would advise the character to do — choose from four realistic options.</p>
          <p>There are no right or wrong answers. Each option reflects a legitimate way people navigate relationships.</p>
          <p>The quiz takes about 10–15 minutes. Your responses are saved only when you complete all 30 scenarios.</p>
        </div>
        <Link
          href="/quiz/1"
          className="inline-block px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  )
}
