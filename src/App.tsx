import { useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MundoCambio from './components/MundoCambio'
import PorQueAhora from './components/PorQueAhora'
import QueEsForo from './components/QueEsForo'
import Metodologia from './components/Metodologia'
import Escalable from './components/Escalable'
import Credenciales from './components/Credenciales'
import LicenciaPais from './components/LicenciaPais'
import Licenciatario from './components/Licenciatario'
import Inversion from './components/Inversion'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { useParallax } from './hooks/useParallax'

export default function App() {
  const main = useRef<HTMLElement>(null)
  useParallax(main)

  return (
    <>
      <Header />
      <main ref={main}>
        <Hero />
        <MundoCambio />
        <PorQueAhora />
        <QueEsForo />
        <Metodologia />
        <Escalable />
        <Credenciales />
        <LicenciaPais />
        <Licenciatario />
        <Inversion />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
