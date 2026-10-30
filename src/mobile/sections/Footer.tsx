import capitolio from '../../assets/img/capitolio-footer.webp'
import { NAV_LINKS } from '../../data/sitio'
import { alClicAncla } from '../anchors'

// En mobile no va el QR del escritorio: ya se está en el teléfono
export default function Footer() {
  return (
    <footer className="m-footer">
      <div className="m-footer__capitol" aria-hidden="true">
        <img src={capitolio} alt="" loading="lazy" data-parallax="30" />
      </div>
      <div className="m-wrap">
        <p className="m-footer__claim" data-reveal>
          Conviértase en el representante oficial <strong>en su país</strong>
        </p>
        <nav className="m-footer__nav" aria-label="Pie de página">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={alClicAncla}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
