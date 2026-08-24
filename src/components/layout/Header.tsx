import { Link, useLocation } from 'react-router-dom'
import Logo from '../ui/Logo'

export default function Header() {
  const { pathname } = useLocation()

  // 聊天页使用简洁 Header
  if (pathname === '/chat') {
    return (
      <header className="sticky top-0 z-50 border-b border-ink-300/40 bg-white/80 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/">
            <Logo size={18} />
          </Link>
          <Link
            to="/"
            className="text-sm text-ink-500 transition-colors hover:text-brand-500"
          >
            返回首页
          </Link>
        </div>
      </header>
    )
  }

  // 首页 / About 页 Header
  return (
    <header className="sticky top-0 z-50 border-b border-ink-300/40 bg-white/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/">
          <Logo size={18} />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/about"
            className="text-sm text-ink-700 transition-colors hover:text-brand-500"
          >
            产品介绍
          </Link>
          <Link to="/chat" className="btn-primary !py-2 !px-4 text-sm">
            开始使用
          </Link>
        </nav>
      </div>
    </header>
  )
}
