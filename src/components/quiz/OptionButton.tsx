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
          ? 'border-gray-900 bg-gray-900 text-white'
          : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400'
      }`}
    >
      <span className={`inline-block w-6 text-sm font-semibold mr-2 ${selected ? 'text-gray-300' : 'text-gray-400'}`}>
        {label}
      </span>
      <span className="text-sm leading-relaxed">{text}</span>
    </button>
  )
}
