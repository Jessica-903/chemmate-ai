/**
 * Hero 区域右侧的 AI 对话窗口 Mockup
 * 纯静态展示，模拟真实产品界面
 */
export default function ChatMockup() {
  return (
    <div className="w-full max-w-[420px] rounded-[14px] border border-ink-300/50 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      {/* 窗口顶栏 */}
      <div className="flex items-center gap-2 border-b border-ink-300/30 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-xs text-ink-500">ChemMate AI</span>
      </div>

      {/* 对话内容 */}
      <div className="space-y-4 p-5">
        {/* 用户消息 */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-[12px] bg-brand-50 px-3.5 py-2.5 text-[13px] text-ink-900">
            准确度和精密度有什么区别？
          </div>
        </div>

        {/* AI 消息 */}
        <div className="flex gap-2">
          <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
            C
          </span>
          <div className="flex-1 text-[13px] leading-relaxed text-ink-700">
            <p className="mb-1">
              <strong className="text-ink-900">准确度</strong>是指测量值与真实值之间的接近程度，反映系统误差的大小。
            </p>
            <p className="mb-1">
              <strong className="text-ink-900">精密度</strong>是指在相同条件下多次测量结果之间的接近程度，反映随机误差的大小。
            </p>
            <div className="mt-2 rounded-[8px] bg-ink-100 px-3 py-2 text-[12px] text-ink-500">
              简单来说：准确度看「偏不偏」，精密度看「稳不稳」。
            </div>
          </div>
        </div>

        {/* 模拟输入框 */}
        <div className="mt-4 flex items-center gap-2 rounded-[10px] border border-ink-300/60 px-3 py-2.5">
          <span className="flex-1 text-[12px] text-ink-300">输入问题……</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-brand-500 text-white">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
