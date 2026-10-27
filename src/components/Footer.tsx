import capitolio from '../assets/img/capitolio-footer.webp'
import { NAV_LINKS } from '../data/sitio'
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
        {/* Espacio reservado para el código QR (pendiente en el diseño) */}
        <div className="footer__qr">QR</div>
      </div>
    </footer>
  )
}
