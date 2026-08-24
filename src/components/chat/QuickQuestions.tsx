import { QUICK_QUESTIONS } from '../../data/questions'

interface QuickQuestionsProps {
  onSelect: (text: string) => void
  /** 是否隐藏（例如正在等待 AI 回复时） */
  hidden?: boolean
}

export default function QuickQuestions({ onSelect, hidden }: QuickQuestionsProps) {
  if (hidden) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {QUICK_QUESTIONS.map((q) => (
        <button
          key={q.text}
          onClick={() => onSelect(q.text)}
          className="rounded-full border border-ink-300/60 bg-white px-3 py-1.5 text-xs text-ink-500 transition-colors hover:border-brand-400 hover:bg-brand-50/50 hover:text-brand-500 active:scale-[0.98]"
        >
          {q.label}
        </button>
      ))}
    </div>
  )
}
