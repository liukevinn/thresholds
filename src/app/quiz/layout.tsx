import AuthGuard from '@/components/shared/AuthGuard'
import QuizProgressWrapper from './QuizProgressWrapper'

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background flex flex-col">
        <QuizProgressWrapper />
        <div className="flex-1 w-full max-w-2xl mx-auto px-6 pb-6">
          {children}
        </div>
      </div>
    </AuthGuard>
  )
}
