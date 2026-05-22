import AuthGuard from '@/components/shared/AuthGuard'

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-sm px-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">Your profile is ready</h1>
          <p className="text-sm text-gray-500">
            Full profile view coming in Phase 3. Your threshold scores have been computed and saved.
          </p>
        </div>
      </div>
    </AuthGuard>
  )
}
