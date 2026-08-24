import { WELCOME_QUESTIONS } from '../../data/questions'

interface ChatWelcomeProps {
  onSelectQuestion: (text: string) => void
}

export default function ChatWelcome({ onSelectQuestion }: ChatWelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Logo */}
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-2xl font-bold text-white">
        C
      </span>

      <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink-900">
        ChemMate AI
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        你的分析化学考研助手
      </p>

      {/* 示例问题 */}
      <div className="mt-8 w-full max-w-xl">
        <p className="mb-4 text-xs text-ink-500">试着问我：</p>
        <div className="flex flex-col gap-2">
          {WELCOME_QUESTIONS.map((q) => (
            <button
              key={q.text}
              onClick={() => onSelectQuestion(q.text)}
              className="group flex items-center justify-between rounded-[10px] border border-ink-300/50 bg-white px-4 py-3 text-left text-sm text-ink-700 transition-all duration-150 hover:border-brand-400 hover:bg-brand-50/50 active:scale-[0.99]"
            >
              <span>{q.label}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-ink-300 transition-colors group-hover:text-brand-400"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
