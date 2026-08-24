import { QuickQuestion } from '../types/chat'

/** 首页初始态展示的三个示例问题 */
export const WELCOME_QUESTIONS: QuickQuestion[] = [
  { label: '什么是准确度和精密度？', text: '什么是准确度和精密度？' },
  { label: '朗伯比尔定律的适用条件是什么？', text: '朗伯比尔定律的适用条件是什么？' },
  { label: '如何理解系统误差和随机误差？', text: '如何理解系统误差和随机误差？' },
]

/** 输入框上方的快捷问题（不超过 4 个） */
export const QUICK_QUESTIONS: QuickQuestion[] = [
  { label: '解释这个概念', text: '请解释这个概念' },
  { label: '帮我分析这个知识点', text: '帮我分析这个知识点' },
  { label: '这个公式怎么理解', text: '这个公式怎么理解' },
]
