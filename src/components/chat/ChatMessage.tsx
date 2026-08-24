import { ChatMessage as ChatMessageType } from '../../types/chat'
import LoadingDots from './LoadingDots'

interface ChatMessageProps {
  message: ChatMessageType
  onRetry?: (id: string) => void
}

export default function ChatMessage({ message, onRetry }: ChatMessageProps) {
  const { role, content, loading, error, id } = message

  // ---------- 用户消息 ----------
  if (role === 'user') {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div className="max-w-[80%] rounded-[12px] bg-brand-50 px-4 py-2.5 text-[15px] leading-relaxed text-ink-900">
          {content}
        </div>
      </div>
    )
  }

  // ---------- AI 消息 ----------
  return (
    <div className="flex gap-3 animate-fade-in-up">
      {/* AI 头像 */}
      <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
        C
      </span>

      <div className="min-w-0 flex-1 pt-0.5">
        {/* 加载中 */}
        {loading ? (
          <div className="flex items-center gap-2 py-1">
            <span className="text-sm text-ink-500">正在分析</span>
            <LoadingDots />
          </div>
        ) : error ? (
          // 错误状态
          <div className="rounded-[10px] border border-red-200 bg-red-50/50 px-4 py-3">
            <p className="text-sm text-ink-700">
              暂时无法连接 AI，请稍后再试。
            </p>
            {onRetry && (
              <button
                onClick={() => onRetry(id)}
                className="mt-2 inline-flex items-center gap-1.5 rounded-[8px] border border-ink-300 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 transition-colors hover:border-brand-400 hover:text-brand-500"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M1 6.5a5 5 0 109-3M1 6.5L1 3M1 6.5L4.5 6.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                重新发送
              </button>
            )}
          </div>
        ) : (
          // 正常回答
          <div className="prose-chat whitespace-pre-wrap text-[15px] leading-relaxed text-ink-900">
            {content}
          </div>
        )}
      </div>
    </div>
  )
}
