interface LogoProps {
  /** 文字大小，默认 18px */
  size?: number
  /** 是否可点击（带链接），默认 false */
  asLink?: boolean
}

export default function Logo({ size = 18, asLink = false }: LogoProps) {
  const content = (
    <span className="inline-flex items-center gap-2">
      {/* 化学元素风格圆形 Logo */}
      <span
        className="inline-flex items-center justify-center rounded-full bg-brand-500 font-bold text-white"
        style={{ width: size + 14, height: size + 14, fontSize: size - 4 }}
      >
        C
      </span>
      <span
        className="font-semibold tracking-tight text-ink-900"
        style={{ fontSize: size }}
      >
        ChemMate{' '}
        <span className="text-brand-500">
          AI
        </span>
      </span>
    </span>
  )

  if (asLink) {
    return (
      <a href="/" className="inline-flex items-center">
        {content}
      </a>
    )
  }

  return content
}
