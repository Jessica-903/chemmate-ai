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
    </div>
  )
}
