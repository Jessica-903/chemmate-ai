import { Link } from 'react-router-dom'
import ChatMockup from './ChatMockup'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas">
      <div className="container-page py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* 左侧文字 */}
          <div className="animate-fade-in-up">
            <span className="tag-brand mb-5">
              分析化学 · 考研 · AI
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink-900 md:text-5xl">
              分析化学考研
              <br />
              <span className="text-brand-500">AI 智能助手</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              把复杂知识讲明白，
              <br />
              让每一次复习更有方向。
            </p>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-500">
              基于专业知识库，为分析化学考研学生提供 AI 知识问答与学习辅助。
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/chat" className="btn-primary">
                开始使用
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link to="/about" className="btn-secondary">
                了解产品
              </Link>
            </div>
          </div>

          {/* 右侧对话窗口 */}
          <div className="flex justify-center md:justify-end">
            <div className="animate-fade-in">
              <ChatMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
