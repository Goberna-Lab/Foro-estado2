import logo from '../assets/img/logo-goberna.webp'
import arrow from '../assets/icons/arrow-right.svg'
import { NAV_LINKS, WHATSAPP_URL } from '../data/sitio'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#inicio" aria-label="Goberna, ir al inicio">
          <img src={logo} alt="Goberna" width={192} height={48} />
        </a>
        <nav className="header__nav" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="header__link">
              {link.label}
            </a>
          ))}
        </nav>
        <a className="header__cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Conversemos
          <img src={arrow} alt="" width={21} height={18} />
        </a>
      </div>
    </header>
  )
}
