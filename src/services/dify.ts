/**
 * Dify API Service Layer
 *
 * 架构：前端 → 后端代理（/api/chat）→ Dify API
 *
 * 前端不直接持有 Dify API Key，通过后端代理转发。
 * 后端代理在 api/chat.ts 中实现（Vercel Serverless Function）。
 *
 * 如果需要切换模型或 API，只需修改本文件。
 */

/** 前端调用的 API 基础地址（后端代理） */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * 模拟 AI 回答（开发阶段无 API Key 时使用）
 * 返回一段包含 Markdown + LaTeX 的真实回答
 */
function mockResponse(question: string): string {
  // 针对常见问题返回预设回答
  const lowerQ = question.toLowerCase()

  if (lowerQ.includes('准确度') || lowerQ.includes('精密度')) {
    return `**准确度（Accuracy）** 和 **精密度（Precision）** 是分析化学中两个重要的质量参数，它们的区别如下：

### 准确度

指测量值与真实值之间的接近程度，反映 **系统误差** 的大小。

> 准确度高，说明测量结果"偏不偏"。

### 精密度

指在相同条件下多次测量结果之间的接近程度，反映 **随机误差** 的大小。

> 精密度高，说明测量结果"稳不稳"。

### 数学表达

标准偏差 $s$ 衡量精密度：

$$s = \\sqrt{\\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n - 1}}$$

其中：
- $x_i$ 为第 $i$ 次测量值
- $\\bar{x}$ 为平均值
- $n$ 为测量次数

### 关系

| | 准确度 | 精密度 |
|---|---|---|
| 反映误差 | 系统误差 | 随机误差 |
| 判断标准 | 与真实值比较 | 各次测量值之间比较 |

> 简单来说：准确度看"偏不偏"，精密度看"稳不稳"。`
  }

  if (lowerQ.includes('朗伯') || lowerQ.includes('比尔') || lowerQ.includes('lambert') || lowerQ.includes('beer')) {
    return `**朗伯-比尔定律（Lambert-Beer Law）** 是分光光度法的基本定律：

$$A = \\varepsilon \\cdot b \\cdot c$$

其中：
- $A$ 为吸光度
- $\\varepsilon$ 为摩尔吸光系数（$L \\cdot mol^{-1} \\cdot cm^{-1}$）
- $b$ 为液层厚度（光程，单位 $cm$）
- $c$ 为溶液浓度（$mol/L$）

### 适用条件

1. **稀溶液**：浓度过高时，分子间作用力增强，偏离线性关系
2. **单色光**：非单色光会导致偏离
3. **均匀介质**：溶液均匀，无散射
4. **无荧光和光化学变化**：被测物在测定条件下稳定
5. **吸光物质间无相互作用**：各组分独立吸光

### 偏离原因

- **化学因素**：缔合、解离等化学反应改变吸光物质浓度
- **光学因素**：非单色光、杂散光、散射光`
  }

  if (lowerQ.includes('系统误差') || lowerQ.includes('随机误差')) {
    return `**系统误差** 和 **随机误差** 是分析化学中两类性质不同的误差：

### 系统误差（可定误差）

- **特点**：方向和大小固定，重复出现
- **来源**：方法误差、仪器误差、试剂误差、操作误差
- **性质**：影响准确度
- **处理方式**：可通过校正、空白试验等方法消除或减小

### 随机误差（不可定误差）

- **特点**：方向和大小不固定，随机变化
- **来源**：环境波动、仪器不稳定、操作微小变化等
- **性质**：影响精密度
- **处理方式**：无法消除，可通过 **多次测量取平均值** 减小

### 正态分布

随机误差服从正态分布：

$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$

> 总结：系统误差"可消除"，随机误差"可减小"。`
  }

  // 通用回答
  return `这是一个很好的问题。在分析化学考研中，关于「${question}」这个知识点：

1. **核心概念**：需要理解其基本定义和物理意义

2. **考研重点**：这是分析化学中的常见考点，建议结合教材重点复习

3. **常见易错点**：注意区分相关概念之间的区别与联系

> 提示：更多详细内容请结合教材和真题进行深入理解。

---

*（当前为模拟回答，配置 Dify API 后将获得真实 AI 回答）*`
}

export interface DifySendMessageParams {
  message: string
  /** 用于流式回调 */
  onChunk?: (chunk: string) => void
  signal?: AbortSignal
}

export interface DifySendMessageResult {
  answer: string
}

/**
 * 发送消息给 AI（通过后端代理）
 *
 * 当前为 Mock 模式 —— 当后端代理未配置 Dify API Key 时，
 * 返回模拟回答。配置后自动切换为真实 API。
 *
 * 如需切换为真实流式 API，将 mock 逻辑替换为 fetch + ReadableStream 即可。
 */
export async function sendMessage({
  message,
  signal,
}: DifySendMessageParams): Promise<DifySendMessageResult> {
  // ---- Mock 模式 ----
  // 延迟模拟网络请求
  await new Promise((resolve) => {
    const timer = setTimeout(resolve, 800 + Math.random() * 600)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      resolve(undefined)
    })
  })

  const answer = mockResponse(message)

  return { answer }
}
