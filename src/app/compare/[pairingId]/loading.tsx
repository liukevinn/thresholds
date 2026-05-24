export default function CompareLoading() {
  return (
    <main className="max-w-[960px] mx-auto px-4 py-12 animate-pulse">
      {/* Header */}
      <div className="mb-10">
        <div className="h-3 w-20 bg-muted rounded mb-3" />
        <div className="h-8 w-56 bg-muted rounded mb-6" />
        <div className="flex gap-6">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </div>

      {/* Highlights grid */}
      <div className="mb-12">
        <div className="h-3 w-16 bg-muted rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-xl" />
            ))}
          </div>
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Patterns */}
      <div className="mb-12">
        <div className="h-3 w-32 bg-muted rounded mb-6" />
        <div className="space-y-4">
          {[0, 1].map((i) => (
            <div key={i} className="h-40 bg-muted rounded-xl" />
          ))}
        </div>
      </div>

      {/* Collapsible toggle */}
      <div className="h-5 w-36 bg-muted rounded" />
    </main>
  )
}
