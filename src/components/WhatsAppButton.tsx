import whatsapp from '../assets/img/whatsapp.webp'
import { WHATSAPP_URL } from '../data/sitio'
import './WhatsAppButton.css'

export default function WhatsAppButton() {
  return (
    <a
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
