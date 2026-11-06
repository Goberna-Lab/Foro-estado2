import { useEffect, useRef, useState } from 'react'
import redGlobal from '../../assets/img/red-global.webp'
import { PUNTOS } from '../../data/contenido'
import MTitle from '../MTitle'

export default function Escalable() {
  const [activo, setActivo] = useState(0)
  const lista = useRef<HTMLUListElement>(null)

  // En el teléfono no hay mouse: se abre el último punto cuyo borde superior pasó la
  // mitad de la pantalla. Las posiciones se miden como si las descripciones estuvieran
  // cerradas, para que abrir o cerrar una no cambie qué punto toca.
  useEffect(() => {
    let frame = 0
    const medir = () => {
      frame = 0
      const linea = window.innerHeight * 0.55
      const items = [...(lista.current?.children ?? [])]
      let i = 0
      let extra = 0
      items.forEach((el, k) => {
        if (el.getBoundingClientRect().top - extra <= linea) i = k
        extra += el.querySelector<HTMLElement>('.m-escalable__reveal')?.offsetHeight ?? 0
      })
      setActivo(i)
    }
    const alScroll = () => {
      if (!frame) frame = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', alScroll, { passive: true })
    window.addEventListener('resize', alScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', alScroll)
      window.removeEventListener('resize', alScroll)
    }
  }, [])

  return (
    <section className="m-section m-escalable">
      <div className="m-escalable__bg" aria-hidden="true">
        <img src={redGlobal} alt="" loading="lazy" data-parallax="110" />
      </div>

      <div className="m-wrap">
        <p className="m-label" data-reveal>
          El mundo cambió
        </p>
        <MTitle
          lines={[
            { text: '¿Qué hace', tone: 'navy' },
            { text: 'escalable al', tone: 'white' },
            { text: 'FORO DE ESTADO?', tone: 'orange' },
          ]}
        />
        <p className="m-text" data-reveal>
          <strong>FORO DE ESTADO</strong> ha sido concebido como un modelo de expansión
          internacional, combinando una <strong className="caps">metodología replicable,</strong> una red de alto nivel integrada por
          altos funcionarios de inteligencia y altos funcionarios políticos de Goberna, y un
          ecosistema de valor que facilita su implementación en distintos países.
        </p>

        <ul className="m-escalable__list" data-stagger ref={lista}>
          {PUNTOS.map((punto, i) => (
            <li key={punto.titulo} className={activo === i ? 'is-open' : ''}>
              <div className="m-escalable__item">
                <span className="m-escalable__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="m-escalable__body">
                  <span className="m-escalable__item-title">{punto.titulo}</span>
                  {punto.descripcion && (
                    <span className="m-escalable__reveal">
                      <span className="m-escalable__item-text">
                        <strong>{punto.destacado}</strong>
                        {punto.descripcion}
                      </span>
                    </span>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
