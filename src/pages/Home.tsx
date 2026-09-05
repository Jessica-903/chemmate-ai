import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Process from '../components/home/Process'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Process />
      </main>
      <Footer />

      {/* 预加载 Dify chatbot：用户在首页浏览时后台加载，点进聊天页秒开 */}
      <iframe
        src="https://udify.app/chatbot/1MWwVdrO3gbkB9b0"
        title="Dify preload"
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: 'none',
          border: 'none',
        }}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  )
}
