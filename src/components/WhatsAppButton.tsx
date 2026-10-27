import { useEffect, useRef } from 'react'
import whatsapp from '../assets/img/whatsapp.webp'
import { WHATSAPP_URL } from '../data/sitio'
import './WhatsAppButton.css'

// Separación (px del diseño) que se mantiene sobre el footer
const MARGEN_FOOTER = 24
const BASE = 40

export default function WhatsAppButton() {
  const ref = useRef<HTMLAnchorElement>(null)

  // Fijo en la base de la pantalla; al llegar al footer sube para no tapar el QR
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    let frame = 0

    const ajustar = () => {
      frame = 0
      const zoom = Number(getComputedStyle(document.documentElement).getPropertyValue('--zoom')) || 1
      const solape = (window.innerHeight - footer.getBoundingClientRect().top) / zoom
      const subir = Math.max(0, solape - BASE + MARGEN_FOOTER)
      ref.current?.style.setProperty('translate', `0 ${-subir}px`)
    }
    const pedir = () => {
      if (!frame) frame = requestAnimationFrame(ajustar)
    }

    ajustar()
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
    }
  }, [])

  return (
    <a
      ref={ref}
      className="whatsapp"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <img src={whatsapp} alt="" width={64} height={64} />
    </a>
  )
}
