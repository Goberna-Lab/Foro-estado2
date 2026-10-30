import type { MouseEvent } from 'react'

/**
 * Lleva a un ancla (#id) con scroll suave. La sección queda bajo la cabecera
 * fija gracias a su scroll-margin-top (ver mobile.css).
 */
export function irAAncla(href: string) {
  const destino = document.querySelector(href)
  if (!destino) return
  destino.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', href)
}

/** onClick para enlaces internos: evita el salto brusco del navegador */
export function alClicAncla(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href')
  if (!href?.startsWith('#')) return
  e.preventDefault()
  irAAncla(href)
}
