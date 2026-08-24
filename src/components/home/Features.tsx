const FEATURES = [
  {
    id: '01',
    title: 'AI 知识问答',
    description: '快速解释分析化学专业知识，用自然语言回答你的疑问。',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a7 7 0 00-7 7c0 2.38 1.2 4.49 3 5.74V18a2 2 0 002 2h4a2 2 0 002-2v-3.26A6.98 6.98 0 0019 9a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: '02',
    title: '考研重点梳理',
    description: '围绕考研场景提炼核心知识与易错点，帮你聚焦重点。',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
        <path d="M16 18l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '03',
    title: '专业知识检索',
    description: '基于分析化学知识库辅助回答，降低无依据回答。',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section className="bg-white">
      <div className="container-page py-16 md:py-24">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-ink-900 md:text-3xl">
            核心功能
          </h2>
          <p className="mt-3 text-sm text-ink-500">
            三个能力，覆盖考研复习中最常见的需求
          </p>
        </div>

        {/* 卡片 */}
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="card-base">
              {/* 编号 */}
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-50 text-brand-500">
                  {feature.icon}
                </span>
                <span className="font-mono text-xs text-ink-300">
                  {feature.id}
                </span>
              </div>

              <h3 className="mb-2 text-base font-semibold text-ink-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
