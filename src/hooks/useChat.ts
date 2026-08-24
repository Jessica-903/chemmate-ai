import { useState, useRef, useCallback } from 'react'
import { ChatMessage } from '../types/chat'
import { sendMessage } from '../services/dify'

let idCounter = 0
function genId(): string {
  idCounter += 1
  return `msg-${Date.now()}-${idCounter}`
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const send = useCallback(async (text: string) => {
    const userMessage: ChatMessage = {
      id: genId(),
      role: 'user',
      content: text,
    }

    const loadingMessage: ChatMessage = {
      id: genId(),
      role: 'assistant',
      content: '',
      loading: true,
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setIsLoading(true)

    // 创建 AbortController 以支持取消
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const { answer } = await sendMessage({
        message: text,
        signal: controller.signal,
      })

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? { ...msg, content: answer, loading: false }
            : msg,
        ),
      )
    } catch {
      // 标记为错误状态
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? { ...msg, loading: false, error: true }
            : msg,
        ),
      )
    } finally {
      setIsLoading(false)
      abortRef.current = null
    }
  }, [])

  const retry = useCallback(
    async (failedMessageId: string) => {
      // 找到失败消息对应的用户消息
      const failedIndex = messages.findIndex((m) => m.id === failedMessageId)
      if (failedIndex === -1) return

      // 向前找最近的用户消息
      let userText = ''
      for (let i = failedIndex - 1; i >= 0; i--) {
        if (messages[i].role === 'user') {
          userText = messages[i].content
          break
        }
      }
      if (!userText) return

      // 重置该消息为 loading
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === failedMessageId
            ? { ...msg, content: '', loading: true, error: false }
            : msg,
        ),
      )
      setIsLoading(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const { answer } = await sendMessage({
          message: userText,
          signal: controller.signal,
        })
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === failedMessageId
              ? { ...msg, content: answer, loading: false }
              : msg,
          ),
        )
      } catch {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === failedMessageId
              ? { ...msg, loading: false, error: true }
              : msg,
          ),
        )
      } finally {
        setIsLoading(false)
        abortRef.current = null
      }
    },
    [messages],
  )

  return {
    messages,
    isLoading,
    send,
    retry,
  }
}
