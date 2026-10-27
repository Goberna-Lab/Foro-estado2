import { useEffect, useRef } from 'react'

/**
 * Parallax de fondo igual al de roberthestratega.com (GSAP ScrollTrigger con
 * scrub, sección "talks" en escritorio): mientras el contenedor padre cruza la
 * pantalla —desde que asoma por abajo hasta que sale por arriba— la imagen se
 * mueve en línea recta de -amount a +amount px, agrandada a `scale` para que
 * no se vean bordes.
 */
export function useParallax<T extends HTMLElement>(amount = 25, scale = 1.06) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const capa = ref.current
    const host = capa?.parentElement
    if (!capa || !host) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const actualizar = () => {
      frame = 0
      const box = host.getBoundingClientRect()
      const vh = window.innerHeight
      if (box.bottom < 0 || box.top > vh) return
      const progreso = Math.min(1, Math.max(0, (vh - box.top) / (vh + box.height)))
      capa.style.transform = `translate3d(0, ${(-amount + 2 * amount * progreso).toFixed(2)}px, 0) scale(${scale})`
    }
    const pedir = () => {
      if (!frame) frame = requestAnimationFrame(actualizar)
    }

    capa.style.willChange = 'transform'
    actualizar()
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
    }
  }, [amount, scale])

  return ref
}
