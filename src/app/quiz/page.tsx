import Link from 'next/link'

export default function QuizIntroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="max-w-md w-full">
        <p className="label-caps mb-3">Threshold</p>
        <h1 className="heading text-3xl text-foreground mb-6">how this works</h1>
        <div className="text-left bg-muted rounded-2xl p-6 mb-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>you&apos;ll read 30 short scenarios involving two recurring characters, <strong className="text-primary font-bold">alice</strong> and <strong className="text-primary font-bold">ben</strong>.</p>
          <p>for each one, you&apos;ll be asked what <em>you</em> would advise the character to do — choose from four realistic options.</p>
          <p>there are no right or wrong answers. each option reflects a legitimate way people navigate relationships.</p>
          <p>the quiz takes about 10–15 minutes. your responses are saved only when you complete all 30 scenarios.</p>
        </div>
        <Link
          href="/quiz/1"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors"
        >
          start quiz
        </Link>
      </div>
    </div>
  )
}
