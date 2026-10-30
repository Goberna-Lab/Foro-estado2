import { useRef, useState } from 'react'
import MobileHeader from './MobileHeader'
import Hero from './sections/Hero'
import MundoCambio from './sections/MundoCambio'
import PorQueAhora from './sections/PorQueAhora'
import QueEsForo from './sections/QueEsForo'
import Metodologia from './sections/Metodologia'
import Escalable from './sections/Escalable'
import Credenciales from './sections/Credenciales'
import LicenciaPais from './sections/LicenciaPais'
import Licenciatario from './sections/Licenciatario'
import Inversion from './sections/Inversion'
import Footer from './sections/Footer'
import WhatsApp from './sections/WhatsApp'
import { useMobileMotion } from './useMobileMotion'
import './mobile.css'

// Landing para teléfonos y tablets (< 1024px). Mismo contenido y anclas que
// el escritorio, recompuesto en vertical.
export default function MobileApp() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  useMobileMotion(root)

  return (
    <div className="m-app" ref={root}>
      <MobileHeader menuOpen={menuOpen} onMenuChange={setMenuOpen} />
      <div className="m-page" inert={menuOpen}>
        <main>
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
        <WhatsApp />
      </div>
    </div>
  )
}
