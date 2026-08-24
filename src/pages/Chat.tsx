import { useState } from 'react'
import Header from '../components/layout/Header'

/**
 * Dify Chatbot iframe 嵌入
 * 通过 src 引入第三方托管的聊天窗口，零 API Key 风险
 */
const DIFY_CHATBOT_URL = 'https://udify.app/chatbot/1MWwVdrO3gbkB9b0'

export default function Chat() {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    // .chat-page: 整页 100dvh + flex column + overflow hidden，
    // 杜绝外层出现第二个垂直滚动条
    <div
      className="chat-page flex h-[100dvh] flex-col overflow-hidden bg-canvas"
    >
      {/* 固定 Header，高度约 64px */}
      <Header />

      {/*
        .chat-container: 占据 Header 之下全部高度
        calc(100dvh - 64px) = 动态视口高 - Header 高
        不设 overflow-y: auto，所有滚动交给 iframe 内部
      */}
      <main
        className="chat-container mx-auto flex w-full max-w-chat flex-col overflow-hidden px-3 md:px-4"
        style={{ height: 'calc(100dvh - 64px)' }}
      >
        {/* iframe 卡片：圆角 + 细边框 + 极轻阴影，保持 ChemMate 视觉语言 */}
        {/* flex-1 + min-h-0：在 flex column 中占满除底部提示外的全部空间 */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[14px] border border-ink-300/50 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
          {/* 加载态 */}
          {!loaded && !failed && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white">
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-brand-200 border-t-brand-500" />
              <p className="text-sm text-ink-500">AI 助手加载中…</p>
            </div>
          )}

          {/* 错误态 */}
          {failed && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white px-6 text-center">
              <p className="text-sm text-ink-700">
                暂时无法连接到 AI 助手，请稍后再试。
              </p>
              <button
                onClick={() => {
                  setFailed(false)
                  setLoaded(false)
                  const iframe = document.getElementById(
                    'dify-chatbot-iframe',
                  ) as HTMLIFrameElement | null
                  if (iframe) iframe.src = iframe.src
                }}
                className="inline-flex items-center gap-1.5 rounded-[8px] border border-ink-300 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 transition-colors hover:border-brand-400 hover:text-brand-500"
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
                重新加载
              </button>
            </div>
          )}

          {/*
            iframe: 100% 宽高占满卡片，无 min-height，
            滚动完全在 iframe 内部进行，避免和外层冲突
          */}
          <iframe
            id="dify-chatbot-iframe"
            src={DIFY_CHATBOT_URL}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className="h-full w-full"
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              display: 'block',
            }}
            frameBorder={0}
            allow="microphone;clipboard-write"
            title="ChemMate AI 聊天助手"
          />
        </div>

        {/*
          AI 使用提示：紧贴 iframe 卡片下方
          - 12px / #9CA3AF / 居中 / 非粗体
          - mt-2.5 = 10px 间距（在 8-12px 范围内）
          - flex-shrink-0 保证不被压缩
          - 移动端单行优先，必要时自然换行
        */}
        <p
          className="mt-2.5 flex-shrink-0 text-center"
          style={{
            color: '#9CA3AF',
            fontSize: '12px',
            lineHeight: 1.5,
          }}
        >
          AI 生成内容仅供学习参考，请结合教材与目标院校官方信息进行核对。
        </p>
      </main>
    </div>
  )
}
