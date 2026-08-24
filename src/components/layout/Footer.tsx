import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-ink-300/40 bg-white">
      <div className="container-page py-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Link to="/">
            <Logo size={16} />
          </Link>
          <p className="text-sm text-ink-500">分析化学考研智能助手</p>
          <p className="text-xs text-ink-300">
            © 2026 ChemMate AI
          </p>
        </div>
      </div>
    </footer>
  )
}
