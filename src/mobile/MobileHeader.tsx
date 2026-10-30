import { useEffect, useRef, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react'
import logo from '../assets/img/logo-goberna.webp'
import foro from '../assets/icons/foro-word.svg'
import { NAV_LINKS, WHATSAPP_URL } from '../data/sitio'
import { alClicAncla, irAAncla } from './anchors'
import { IconArrow, IconClose, IconMenu } from './icons'

type Props = {
  menuOpen: boolean
  onMenuChange: (open: boolean) => void
}

const orden = (i: number) => ({ '--i': i }) as CSSProperties

export default function MobileHeader({ menuOpen, onMenuChange }: Props) {
  const boton = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  // Con el menú abierto: sin scroll de fondo, foco dentro y Escape para cerrar
  useEffect(() => {
    if (!menuOpen) return
    const html = document.documentElement
    html.style.overflow = 'hidden'
    panel.current?.querySelector<HTMLElement>('a, button')?.focus()
    const alTeclear = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onMenuChange(false)
    }
    document.addEventListener('keydown', alTeclear)
    const botonMenu = boton.current
    return () => {
      html.style.overflow = ''
      document.removeEventListener('keydown', alTeclear)
      botonMenu?.focus()
    }
  }, [menuOpen, onMenuChange])

  // Tab y Shift+Tab dan la vuelta dentro del menú
  const contenerFoco = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return
    const focos = panel.current!.querySelectorAll<HTMLElement>('a, button')
    const primero = focos[0]
    const ultimo = focos[focos.length - 1]
    if (e.shiftKey && document.activeElement === primero) {
      e.preventDefault()
      ultimo.focus()
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault()
      primero.focus()
    }
  }

  // Primero se cierra (libera el scroll) y en el siguiente frame se navega
  const elegir = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')!
    onMenuChange(false)
    requestAnimationFrame(() => irAAncla(href))
  }

  return (
    <>
      <header className="m-header">
        <button
          ref={boton}
          type="button"
          className="m-header__toggle"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="m-menu"
          onClick={() => onMenuChange(true)}
        >
          <IconMenu />
        </button>
        <a href="#inicio" className="m-header__logo" aria-label="Goberna, ir al inicio" onClick={alClicAncla}>
          <img src={logo} alt="Goberna" width={144} height={36} />
        </a>
        <a className="m-header__cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Conversemos
          <IconArrow />
        </a>
      </header>

      <div
        ref={panel}
        id="m-menu"
        className={`m-menu${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        hidden={!menuOpen}
        onKeyDown={contenerFoco}
        // Tocar fuera de la lista cierra
        onClick={(e) => e.target === e.currentTarget && onMenuChange(false)}
      >
        {/* La X queda donde estaba la hamburguesa */}
        <div className="m-menu__top">
          <button type="button" className="m-menu__close" aria-label="Cerrar menú" onClick={() => onMenuChange(false)}>
            <IconClose />
          </button>
          <img src={foro} alt="" className="m-menu__word" />
        </div>
        <nav aria-label="Principal">
          <ol className="m-menu__list">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} style={orden(i)}>
                <a href={link.href} onClick={elegir}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <a
          className="m-btn m-btn--orange m-menu__cta"
          style={orden(NAV_LINKS.length)}
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
        >
          Conversemos
          <IconArrow />
        </a>
      </div>
    </>
  )
}
