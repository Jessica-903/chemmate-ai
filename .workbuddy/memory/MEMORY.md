# ChemMate AI · 项目记忆

## 产品定位
- 分析化学考研智能助手，MVP 阶段
- 三大核心功能：AI 知识问答 / 考研重点梳理 / 专业知识检索
- 设计关键词：专业、克制、留白、清晰、轻科技、教育感、AI感
- 主色：#F97316（品牌橙），辅色：#FB923C，深色文字：#111827，背景：#FAFAF9/#FFFFFF

## 技术栈
- Vite + React 18 + TypeScript + Tailwind CSS
- react-router-dom（页面路由）
- react-markdown + remark-math + rehype-katex（Markdown + LaTeX 公式渲染）
- 当前阶段为 Mock 模式（无 Dify API Key 也可演示）

## 关键目录
- src/services/dify.ts：Dify API 封装（service 层）
- src/hooks/useChat.ts：聊天状态管理
- src/components/home/*：首页各 section（Hero/Features/Process/ChatMockup）
- src/components/chat/*：聊天页组件（Welcome/Message/Input/QuickQuestions/LoadingDots）
- src/lib/Markdown.tsx：统一的 Markdown 渲染（支持 LaTeX）
- src/pages/*：路由页面（Home/Chat/About）
- tailwind.config.js：全局颜色 / 字体 / 动画 / 容器宽度

## 当前进度
- 全部任务完成：项目结构、首页、聊天页、产品介绍页、Dify Service、响应式适配
- TypeScript 零错误，build 干净通过
- 三个页面都已实现：/ 首页、/chat AI 聊天、/about 产品介绍
- **聊天页当前为 iframe 嵌入模式**（Dify Chatbot 第三方托管：https://udify.app/chatbot/1MWwVdrO3gbKB9b0）
  - 桌面端最大宽度 1100px 居中，iframe 高度 flex-1 + min-height 700px
  - 移动端 width 100%，无横向滚动
  - 加载态：旋转 spinner；错误态：重新加载按钮
- src/services/dify.ts（mock service）和 useChat / 聊天组件代码暂未删除，保留备用
- 切换 API 模式时只需重写 src/services/dify.ts + src/pages/Chat.tsx，其他文件不用动

## 姐姐关注的事
- 严格按需求开发，不擅自添加功能（用户/支付/积分等全部留到 V2）
- 文案要克制，避免营销腔
- 视觉不要像"培训网站"或"炫技型作品集"，要像"已经上线的真实 AI 产品"
- 所有按钮有 hover/active 状态，移动端必须测试
