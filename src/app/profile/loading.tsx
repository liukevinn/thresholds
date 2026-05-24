export default function ProfileLoading() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 animate-pulse">
      <div className="mb-10">
        <div className="h-3 w-28 bg-muted rounded mb-3" />
        <div className="h-9 w-48 bg-muted rounded mb-2" />
        <div className="h-3 w-36 bg-muted rounded" />
      </div>
      <div className="mb-10 flex gap-3">
        <div className="h-9 w-40 bg-muted rounded-lg" />
      </div>
      <div className="space-y-6">
        {[0, 1, 2].map((g) => (
          <div key={g} className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <div className="h-5 w-40 bg-muted rounded" />
            </div>
            <div className="px-4 divide-y divide-border">
              {[0, 1, 2].map((i) => (
                <div key={i} className="py-3 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-36 bg-muted rounded" />
                    <div className="h-4 w-8 bg-muted rounded" />
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full" />
                  <div className="h-3 w-3/4 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
