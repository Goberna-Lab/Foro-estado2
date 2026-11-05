import capitolio from '../assets/img/capitolio-footer.webp'
import qr from '../assets/img/qr-whatsapp.svg'
import { NAV_LINKS, WHATSAPP_URL } from '../data/sitio'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <img className="footer__capitol" src={capitolio} alt="" />
      <div className="container">
        <p className="footer__claim">
          Conviértase en el representante
          <br />
          oficial <strong>en su país</strong>
        </p>
        <nav className="footer__nav" aria-label="Pie de página">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className="footer__qr"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Escanea o haz clic para escribirnos por WhatsApp"
        >
          <img src={qr} alt="Código QR de WhatsApp" width={170} height={170} />
        </a>
      </div>
    </footer>
  )
}
