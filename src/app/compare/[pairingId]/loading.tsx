export default function CompareLoading() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 animate-pulse">
      <div className="mb-10">
        <div className="h-3 w-40 bg-gray-100 rounded mb-3" />
        <div className="h-7 w-56 bg-gray-200 rounded" />
      </div>
      <div className="space-y-10 mb-12">
        {[0, 1, 2].map((g) => (
          <div key={g}>
            <div className="h-3 w-28 bg-gray-100 rounded mb-4" />
            <div className="divide-y divide-gray-50">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="py-3 space-y-2">
                  <div className="flex justify-between mb-1">
                    <div className="h-4 w-40 bg-gray-100 rounded" />
                    <div className="flex gap-2">
                      <div className="h-4 w-16 bg-gray-100 rounded" />
                      <div className="h-4 w-6 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full" />
                  <div className="h-1.5 w-full bg-gray-100 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-12">
        <div className="h-3 w-20 bg-gray-100 rounded mb-4" />
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-2">
              <div className="h-4 w-32 bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-3/4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
