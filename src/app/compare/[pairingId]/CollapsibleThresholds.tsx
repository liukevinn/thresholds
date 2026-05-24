'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function CollapsibleThresholds({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
      >
        <span>View all thresholds</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  )
}
