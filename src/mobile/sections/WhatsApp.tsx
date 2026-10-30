import { useEffect, useState } from 'react'
import whatsapp from '../../assets/img/whatsapp.webp'
import { WHATSAPP_URL } from '../../data/sitio'

// Botón flotante; se oculta sobre el pie para no tapar sus enlaces
export default function WhatsApp() {
  const [oculto, setOculto] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('.m-footer')
    if (!footer) return
    const io = new IntersectionObserver(([e]) => setOculto(e.isIntersecting))
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  return (
    <a
      className={`m-whatsapp${oculto ? ' is-hidden' : ''}`}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      aria-hidden={oculto || undefined}
      tabIndex={oculto ? -1 : undefined}
    >
      <img src={whatsapp} alt="" width={56} height={56} />
    </a>
  )
}
