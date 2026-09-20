import AnimatedBackground from './components/AnimatedBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <About />
        <Projects />
        <Services />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
