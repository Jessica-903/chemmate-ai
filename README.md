# ChemMate AI

> 分析化学考研 AI 智能助手 · MVP V1.0

一个为分析化学考研学生设计的垂直领域 AI 学习助手，帮你快速理解专业知识、梳理考点。

## 技术栈

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** - 原子化样式
- **react-router-dom** - 页面路由
- **react-markdown** + **remark-math** + **rehype-katex** - Markdown + LaTeX 公式渲染

## 项目结构

```
chemmate-ai/
├── api/                          # 后端代理（Vercel Serverless Function）
│   └── chat.ts                   # Dify API 代理（待部署时启用）
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── chat/                 # 聊天页组件
│   │   │   ├── ChatInput.tsx     # 输入框
│   │   │   ├── ChatMessage.tsx   # 消息气泡（用户/AI）
│   │   │   ├── ChatWelcome.tsx   # 欢迎态
│   │   │   ├── LoadingDots.tsx   # Loading 动画
│   │   │   └── QuickQuestions.tsx# 快捷问题
│   │   ├── home/                 # 首页组件
│   │   │   ├── ChatMockup.tsx    # 对话窗口 mockup
│   │   │   ├── Features.tsx      # 三大功能卡片
│   │   │   ├── Hero.tsx          # Hero 区
│   │   │   └── Process.tsx       # 三步流程
│   │   ├── layout/               # 全局布局
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── ui/
│   │       └── Logo.tsx
│   ├── data/
│   │   └── questions.ts          # 示例问题配置
│   ├── hooks/
│   │   └── useChat.ts            # 聊天状态管理 hook
│   ├── lib/
│   │   └── Markdown.tsx          # Markdown 渲染（含 LaTeX）
│   ├── pages/
│   │   ├── About.tsx             # /about 产品介绍
│   │   ├── Chat.tsx              # /chat AI 聊天
│   │   └── Home.tsx              # / 首页
│   ├── services/
│   │   └── dify.ts               # Dify API 封装
│   ├── types/
│   │   └── chat.ts               # 类型定义
│   ├── App.tsx                   # 路由
│   ├── main.tsx                  # 入口
│   ├── index.css                 # 全局样式
│   └── vite-env.d.ts             # 环境变量类型
├── .env.example                  # 环境变量示例
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js            # ← 全局颜色 / 字体 / 容器配置
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json                   # Vercel 部署配置
└── vite.config.ts
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

浏览器打开 http://localhost:5173/ 即可看到首页。

> 当前为 **Mock 模式**：无需 Dify API Key 也能演示，聊天页面会返回模拟回答。
> 切换到真实 Dify API 见下方「接入 Dify」一节。

### 3. 三个页面

| 路径 | 说明 |
|---|---|
| `/` | 首页（Hero + 功能 + 流程） |
| `/chat` | AI 聊天（最重要的页面） |
| `/about` | 产品介绍 |

### 4. 生产构建

```bash
npm run build
```

产物输出到 `dist/` 目录，可直接部署到 Vercel / Netlify / Nginx 等任何静态托管。

### 5. 类型检查

```bash
npx tsc --noEmit
```

## 接入 Dify AI

### 架构

```
浏览器  →  /api/chat（后端代理）  →  Dify API  →  AI 模型 + 知识库
```

> 前端不持有 Dify API Key，避免泄露。

### 配置步骤

**1. 在 Dify 平台创建应用**

- 访问 https://dify.ai
- 创建一个 **Chatbot** 或 **Agent** 应用
- 在「API 访问」中复制 **API Key**

**2. 配置环境变量**

复制 `.env.example` 为 `.env`：

```bash
cp .env.example .env
```

编辑 `.env`：

```env
DIFY_API_KEY=app-xxxxxxxxxxxxxxxxxxxxxxxx
DIFY_BASE_URL=https://api.dify.ai/v1
```

> 如果是自部署的 Dify，把 `DIFY_BASE_URL` 改成你的实例地址。

**3. 实现后端代理（api/chat.ts）**

当前项目预留了 `api/` 目录。Vercel 部署时，`api/chat.ts` 会自动成为 Serverless Function。

实现思路（见 `api/chat.ts` 注释）：

```ts
// 接收前端的 POST 请求，转发给 Dify
const response = await fetch(`${DIFY_BASE_URL}/chat-messages`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${DIFY_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    inputs: {},
    query: userMessage,
    response_mode: 'streaming',  // 或 'blocking'
    user: 'anonymous',
  }),
})
```

**4. 切换前端调用方式**

编辑 `src/services/dify.ts`，把 `mockResponse` 替换为对 `/api/chat` 的真实 fetch：

```ts
export async function sendMessage({ message }) {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  const data = await res.json()
  return { answer: data.answer }
}
```

> 全部 API 逻辑只在这一个文件里修改，UI 层不用动。

## 部署到 Vercel

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod
```

**环境变量** 在 Vercel 控制台配置：

- `DIFY_API_KEY`
- `DIFY_BASE_URL`

## 关键文件对照表

姐姐想改哪里就看对应文件：

| 想改的内容 | 打开这个文件 |
|---|---|
| 首页整体结构 | `src/pages/Home.tsx` |
| 首页 Hero 区文案 | `src/components/home/Hero.tsx` |
| 首页功能卡片 | `src/components/home/Features.tsx` |
| 首页三步流程 | `src/components/home/Process.tsx` |
| 聊天页整体结构 | `src/pages/Chat.tsx` |
| 聊天欢迎态 / 示例问题 | `src/components/chat/ChatWelcome.tsx` |
| 输入框 / 发送逻辑 | `src/components/chat/ChatInput.tsx` |
| 消息气泡样式 | `src/components/chat/ChatMessage.tsx` |
| 快捷问题 | `src/data/questions.ts` |
| 产品介绍页 | `src/pages/About.tsx` |
| **Dify API 调用** | `src/services/dify.ts` |
| 聊天状态管理 | `src/hooks/useChat.ts` |
| **全局颜色 / 字体** | `tailwind.config.js` |
| 全局 CSS / 滚动条 / Markdown 排版 | `src/index.css` |
| Logo 样式 | `src/components/ui/Logo.tsx` |
| Header / Footer | `src/components/layout/*` |

## 设计规范

- **主色**：`#F97316`（橙色，类名 `brand-500`）
- **辅色**：`#FB923C`（`brand-400`）
- **深色文字**：`#111827`（`ink-900`）
- **次级文字**：`#6B7280`（`ink-500`）
- **背景**：`#FAFAF9`（`canvas`）
- **圆角**：8 ~ 14px
- **正文最大宽度**：760px（`max-w-prose`）
- **页面最大宽度**：1200px（`max-w-content`）
- **聊天区最大宽度**：900px（`max-w-chat`）

## License

MIT
