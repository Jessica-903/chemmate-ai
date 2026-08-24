export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  /** 是否正在生成中 */
  loading?: boolean
  /** 是否发送失败 */
  error?: boolean
}

export interface QuickQuestion {
  label: string
  /** 实际发送给 AI 的文本 */
  text: string
}
