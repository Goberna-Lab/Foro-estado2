import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const DRIFT = 60 // desplazamiento máximo de .px-bg (px de diseño)
const DRIFT_FOTO = 20 // deriva más discreta para las fotos de contenido (.px-foto)
const LENTO = 0.7 // .px-lento recorre solo el 30% de lo que se scrollea

// Todo el layout está en px de diseño y #root se escala con --zoom (ver index.html)
const zoom = () => Number(getComputedStyle(document.documentElement).getPropertyValue('--zoom')) || 1

/**
 * Efectos de fondo al hacer scroll, para todo lo que haya dentro de `scope`:
 * - `.px-bg`: el fondo va de -60 a +60px mientras su sección cruza la pantalla,
 *   escalado lo justo para que nunca se vean sus bordes.
 * - `.px-foto`: lo mismo con ±20px, para las fotos de contenido.
 * - `.px-lento`: parallax fuerte, casi fijo (la foto de "¿Qué es el Foro?", que
 *   en el XD es una capa fija). Su capa debe terminar en el color de la sección.
 * Con prefers-reduced-motion los fondos quedan quietos y exactos al diseño.
 */
export function useParallax(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const derivas: [string, number][] = [
          ['.px-bg', DRIFT],
          ['.px-foto', DRIFT_FOTO],
        ]
        for (const [selector, drift] of derivas) {
          gsap.utils.toArray<HTMLElement>(selector, scope.current).forEach((bg) => {
            const scale = 1 + (2 * (drift + 4)) / bg.offsetHeight
            gsap.fromTo(
              bg,
              { y: -drift, scale },
              {
                y: drift,
                scale,
                ease: 'none',
                scrollTrigger: { trigger: bg.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true },
              },
            )
          })
        }

        // Equivale a mover el fondo -LENTO·(top de la sección): 0 cuando la sección
        // toca el borde superior, y nunca deja ver un hueco mientras ese borde se ve
        gsap.utils.toArray<HTMLElement>('.px-lento', scope.current).forEach((bg) => {
          const section = bg.closest('section')!
          gsap.fromTo(
            bg,
            { y: () => (-LENTO * innerHeight) / zoom() },
            {
              y: () => (LENTO * section.getBoundingClientRect().height) / zoom(),
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          )
        })
      })
    },
    { scope },
  )
}
