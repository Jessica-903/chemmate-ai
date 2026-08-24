const STEPS = [
  {
    id: '01',
    title: '提出问题',
    description: '输入你不懂的知识点或考研题目。',
  },
  {
    id: '02',
    title: 'AI 分析',
    description: '基于专业知识库分析你的问题。',
  },
  {
    id: '03',
    title: '获得专业解答',
    description: '得到清晰、有依据的解释与总结。',
  },
]

export default function Process() {
  return (
    <section className="bg-canvas">
      <div className="container-page py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-ink-900 md:text-3xl">
            三步使用
          </h2>
          <p className="mt-3 text-sm text-ink-500">
            从提问到解答，简单直接
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="grid gap-4 md:grid-cols-3 md:gap-0">
            {STEPS.map((step, index) => (
              <div key={step.id} className="relative flex flex-col items-center text-center">
                {/* 圆形序号 */}
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-400 bg-white font-mono text-sm font-semibold text-brand-500">
                  {step.id}
                </span>

                <h3 className="mt-4 text-base font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-[200px] text-sm text-ink-500">
                  {step.description}
                </p>

                {/* 连接箭头（桌面端） */}
                {index < STEPS.length - 1 && (
                  <div className="absolute left-full top-6 hidden h-[2px] w-full md:block">
                    <div className="mx-auto h-full w-[60%] bg-gradient-to-r from-brand-400/40 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a href="/chat" className="btn-primary">
            立即体验
          </a>
        </div>
      </div>
    </section>
  )
}
