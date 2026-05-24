export default function ProfileLoading() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 animate-pulse">
      <div className="mb-10">
        <div className="h-3 w-32 bg-gray-100 rounded mb-3" />
        <div className="h-7 w-48 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-40 bg-gray-100 rounded" />
      </div>
      <div className="mb-8">
        <div className="h-9 w-40 bg-gray-100 rounded-lg" />
      </div>
      <div className="space-y-10">
        {[0, 1, 2].map((g) => (
          <div key={g}>
            <div className="h-3 w-28 bg-gray-100 rounded mb-4" />
            <div className="divide-y divide-gray-50">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="py-3 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-36 bg-gray-100 rounded" />
                    <div className="h-4 w-8 bg-gray-100 rounded" />
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
