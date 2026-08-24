import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const PAIN_POINTS = [
  { title: '知识点难理解', desc: '分析化学概念抽象，公式推导复杂，教科书解释往往不够直观。' },
  { title: '真题重点难梳理', desc: '考点分散在多本教材中，难以高效提炼哪些是高频考点。' },
  { title: '专业资料分散', desc: '需要翻阅多个来源才能拼凑出完整答案，效率低下。' },
]

const SOLUTIONS = [
  { title: 'AI 知识问答', desc: '用自然语言提问，即时获得专业解答。' },
  { title: '专业知识检索', desc: '基于分析化学知识库辅助回答，降低无依据回答。' },
  { title: '考研重点辅助', desc: '围绕考研场景提炼核心知识，帮你聚焦重点。' },
]

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Header />

      <main className="flex-1">
        {/* 标题区 */}
        <section className="border-b border-ink-300/40 bg-white">
          <div className="container-prose py-16 md:py-20 text-center">
            <span className="tag-brand mb-5">关于产品</span>
            <h1 className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">
              为什么做 ChemMate AI？
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-700">
              在分析化学考研学习过程中，很多问题并不是没有资料，而是资料过于分散、概念难以理解、缺少针对性的解释。
            </p>
          </div>
        </section>

        {/* 痛点 */}
        <section className="bg-canvas">
          <div className="container-page py-16 md:py-24">
            <div className="mb-10">
              <span className="font-mono text-xs text-brand-500">PROBLEM</span>
              <h2 className="mt-1 text-xl font-bold text-ink-900">
                用户痛点
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {PAIN_POINTS.map((point) => (
                <div key={point.title} className="card-base">
                  <span className="mb-3 block h-1 w-8 rounded-full bg-brand-400" />
                  <h3 className="mb-2 text-base font-semibold text-ink-900">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-500">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 方案 */}
        <section className="bg-white">
          <div className="container-page py-16 md:py-24">
            <div className="mb-10">
              <span className="font-mono text-xs text-brand-500">SOLUTION</span>
              <h2 className="mt-1 text-xl font-bold text-ink-900">
                产品方案
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {SOLUTIONS.map((solution) => (
                <div key={solution.title} className="card-base">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[8px] bg-brand-50 text-brand-500">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M3 9l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-ink-900">
                    {solution.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-500">
                    {solution.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <a href="/chat" className="btn-primary">
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
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
