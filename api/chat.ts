/**
 * Dify API 代理 —— Vercel Serverless Function
 *
 * 架构：前端 → 本函数 → Dify API
 *
 * 前端不持有 API Key，由本函数从环境变量读取后转发。
 *
 * 环境变量（在 Vercel 项目设置中配置）：
 *   DIFY_API_KEY  —— Dify 应用的 API Key
 *   DIFY_BASE_URL —— Dify API 基础地址，如 https://api.dify.ai/v1
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'

interface DifyRequestBody {
  message: string
  conversation_id?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 只接受 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, conversation_id } = req.body as DifyRequestBody

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' })
  }

  // 从环境变量读取
  const apiKey = process.env.DIFY_API_KEY
  const baseUrl = process.env.DIFY_BASE_URL || 'https://api.dify.ai/v1'

  // 如果没有配置 API Key，返回 mock 数据
  if (!apiKey) {
    return res.status(200).json({
      answer:
        'Dify API Key 未配置。请在 Vercel 项目设置中添加环境变量 DIFY_API_KEY 和 DIFY_BASE_URL。',
      conversation_id: '',
    })
  }

  try {
    // 调用 Dify Chat Messages API
    // 文档：https://docs.dify.ai/guides/application-publishing/developing-with-apis
    const response = await fetch(`${baseUrl}/chat-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: {},
        query: message,
        response_mode: 'blocking',
        conversation_id: conversation_id || '',
        user: 'chemmate-web-user',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Dify API error:', response.status, errorText)
      // 不向前端暴露技术细节
      return res.status(503).json({ error: 'AI 服务暂时不可用' })
    }

    const data = await response.json()

    return res.status(200).json({
      answer: data.answer,
      conversation_id: data.conversation_id || '',
    })
  } catch {
    // 网络错误等
    return res.status(503).json({ error: 'AI 服务暂时不可用' })
  }
}
