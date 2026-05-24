'use client'

interface OptionButtonProps {
  label: string
  text: string
  selected: boolean
  onClick: () => void
}

export default function OptionButton({ label, text, selected, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 ${
        selected
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50'
      }`}
    >
      <span className={`inline-block w-6 text-sm font-bold mr-2 ${selected ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
        {label}
      </span>
      <span className="text-sm leading-relaxed">{text}</span>
    </button>
  )
}
