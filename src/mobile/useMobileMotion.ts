import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const num = (v: string | undefined, porDefecto: number) => (v ? Number(v) : porDefecto)

/**
 * Animaciones del mobile, declaradas en el HTML con atributos:
 * - `data-reveal` (+ `data-reveal-delay="s"`): aparece subiendo al entrar en pantalla.
 * - `data-stagger`: sus hijos aparecen uno tras otro.
 * - `data-wipe`: las franjas de un título (`.m-title__line`) se descubren de izquierda a derecha.
 * - `data-line` / `data-line="y"`: línea que se dibuja; la vertical sigue al scroll.
 * - `data-parallax="n"`: capa que recorre ±n px mientras su marco cruza la pantalla,
 *   escalada lo justo para que nunca se vean sus bordes.
 * - `data-lento="f"`: parallax fuerte (la foto de "¿Qué es el Foro?", como en escritorio).
 * - `data-hundir="n"`: el contenido del hero baja n% y se desvanece al salir.
 * - `data-unveil`: marco de foto que se descubre de abajo hacia arriba.
 * - `data-count="n"`: número que cuenta desde 0 hasta n.
 * - `data-words`: título cuyas palabras (`.m-word`) se entintan con el scroll.
 * - `data-list`: filas que se encienden una tras otra con el scroll.
 * Los estados iniciales se ponen desde JS: sin JS o con movimiento reducido
 * todo queda visible y quieto.
 */
export function useMobileMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, root.current)

        q('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 28,
            duration: 0.9,
            delay: num(el.dataset.revealDelay, 0),
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })

        q('[data-stagger]').forEach((el) => {
          gsap.from(el.children, {
            autoAlpha: 0,
            y: 36,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          })
        })

        q('[data-wipe]').forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll('.m-title__line'),
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.9,
              stagger: 0.14,
              ease: 'power3.inOut',
              clearProps: 'clipPath', // devuelve la sombra de la franja blanca
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          )
        })

        q('[data-line]').forEach((el) => {
          if (el.dataset.line === 'y') {
            gsap.fromTo(
              el,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                transformOrigin: 'top',
                scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 55%', scrub: true },
              },
            )
          } else {
            gsap.from(el, {
              scaleX: 0,
              transformOrigin: 'left',
              duration: 1,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            })
          }
        })

        q('[data-parallax]').forEach((el) => {
          const marco = el.parentElement!
          const drift = num(el.dataset.parallax, 40)
          // Holgura que ya tiene la capa por encima y por debajo de su marco
          const arriba = -el.offsetTop
          const abajo = el.offsetTop + el.offsetHeight - marco.clientHeight
          const falta = Math.max(0, drift + 2 - Math.min(arriba, abajo))
          const scale = 1 + (2 * falta) / el.offsetHeight
          gsap.fromTo(
            el,
            { y: -drift, scale },
            {
              y: drift,
              scale,
              ease: 'none',
              scrollTrigger: { trigger: marco, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        // Equivale a mover la capa -f·(top de la sección): 0 cuando la sección
        // toca el borde superior, y nunca deja ver un hueco mientras ese borde se ve
        q('[data-lento]').forEach((el) => {
          const section = el.closest('section')!
          const f = num(el.dataset.lento, 0.7)
          gsap.fromTo(
            el,
            { y: () => -f * innerHeight },
            {
              y: () => f * section.offsetHeight,
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

        q('[data-hundir]').forEach((el) => {
          gsap.to(el, {
            yPercent: num(el.dataset.hundir, 30),
            autoAlpha: 0.15,
            ease: 'none',
            scrollTrigger: { trigger: el.closest('section'), start: 'top top', end: 'bottom top', scrub: true },
          })
        })

        q('[data-unveil]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.3,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          )
        })

        // El valor final va en el atributo: el texto se pisa durante la cuenta
        const contadores = q('[data-count]')
        contadores.forEach((el) => {
          const final = Number(el.dataset.count)
          const valor = { n: 0 }
          el.textContent = '0'
          gsap.to(valor, {
            n: final,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = String(Math.round(valor.n))
            },
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })

        q('[data-words]').forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll('.m-word'),
            { opacity: 0.18 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: true },
            },
          )
        })

        q('[data-list]').forEach((el) => {
          gsap.fromTo(
            el.children,
            { opacity: 0.2, x: -18 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.3,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 55%', scrub: true },
            },
          )
        })

        return () => contadores.forEach((el) => (el.textContent = el.dataset.count!))
      })
    },
    { scope: root, revertOnUpdate: true },
  )
}
