import { useEffect, useRef, useState } from 'react'
import { FASE_MS, FASES } from '../../data/contenido'
import MTitle from '../MTitle'
import { IconArrow, IconArrowLeft } from '../icons'

const numero = (i: number) => String(i + 1).padStart(2, '0')
// Tras tocar el carrusel, el autoplay espera este tiempo antes de seguir
const PAUSA_TOQUE_MS = 8000

export default function Metodologia() {
  const pista = useRef<HTMLOListElement>(null)
  const [activa, setActiva] = useState(0)
  const [enFin, setEnFin] = useState({ inicio: true, fin: false })
  const [pausado, setPausado] = useState(false)
  const [movimiento, setMovimiento] = useState(true)

  useEffect(() => {
    const mql = matchMedia('(prefers-reduced-motion: reduce)')
    const actualizar = () => setMovimiento(!mql.matches)
    actualizar()
    mql.addEventListener('change', actualizar)
    return () => mql.removeEventListener('change', actualizar)
  }, [])

  // Fase activa, contador y flechas salen del scroll real de la pista
  const leerScroll = () => {
    const el = pista.current!
    const max = el.scrollWidth - el.clientWidth
    const [a, b] = el.children as HTMLCollectionOf<HTMLElement>
    const paso = b.offsetLeft - a.offsetLeft
    setActiva(Math.min(FASES.length - 1, Math.round(el.scrollLeft / paso)))
    setEnFin({ inicio: el.scrollLeft <= 2, fin: el.scrollLeft >= max - 2 })
  }

  const irA = (i: number) => {
    const el = pista.current!
    const destino = el.children[(i + FASES.length) % FASES.length] as HTMLElement
    const margen = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0
    el.scrollTo({ left: destino.offsetLeft - margen, behavior: 'smooth' })
  }

  // Autoplay: avanza cada FASE_MS; al final vuelve a la primera
  useEffect(() => {
    if (pausado || !movimiento) return
    const id = setTimeout(() => irA(enFin.fin ? 0 : activa + 1), FASE_MS)
    return () => clearTimeout(id)
  }, [activa, enFin.fin, pausado, movimiento])

  useEffect(() => {
    if (!pausado) return
    const id = setTimeout(() => setPausado(false), PAUSA_TOQUE_MS)
    return () => clearTimeout(id)
  }, [pausado])

  const tocar = () => setPausado(true)

  return (
    <section className="m-metodo" id="modelo">
      <div className="m-section m-metodo__intro">
        <div className="m-wrap">
          <p className="m-label m-label--ink" data-reveal>
            Metodología operativa
          </p>
          <MTitle
            lines={[
              { text: 'Un proceso en', tone: 'white' },
              { text: '4 fases', tone: 'orange', size: 1.16 },
            ]}
          />
          <p className="m-text" data-reveal>
            <strong>La Visión de Estado</strong> no surge de una única disciplina, una sola
            experiencia o una única forma de pensar.
          </p>
          <p className="m-text" data-reveal>
            Se construye integrando el interés nacional a través de un modelo estandarizado que
            transforma el diálogo estratégico en resultados de largo plazo.
          </p>
        </div>
      </div>

      <div className="m-metodo__slider">
        <div className="m-wrap">
          {/* Progreso de la fase activa, como las pestañas del escritorio */}
          <ol className="m-metodo__tabs" aria-label="Fases">
            {FASES.map((f, i) => (
              <li key={f.titulo}>
                <button
                  type="button"
                  className={i === activa ? 'is-active' : i < activa ? 'is-done' : ''}
                  aria-current={i === activa}
                  aria-label={`Fase ${numero(i)}: ${f.titulo}`}
                  onClick={() => {
                    tocar()
                    irA(i)
                  }}
                >
                  <i
                    key={i === activa ? `${activa}-${pausado}` : undefined}
                    style={{
                      animationDuration: `${FASE_MS}ms`,
                      animationPlayState: pausado || !movimiento ? 'paused' : 'running',
                    }}
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <ol
          ref={pista}
          className="m-metodo__track"
          onScroll={leerScroll}
          onPointerDown={tocar}
          onTouchStart={tocar}
          aria-label="Fases del proceso"
        >
          {FASES.map((fase, i) => (
            <li key={fase.titulo} className="m-metodo__card" aria-roledescription="diapositiva" aria-label={`${numero(i)} de ${numero(FASES.length - 1)}`}>
              <div className="m-photo m-metodo__photo">
                <img src={fase.imagen} alt="" loading="lazy" data-parallax="28" />
              </div>
              <p className="m-metodo__number">{numero(i)}</p>
              <h3 className="m-metodo__phase">{fase.titulo}</h3>
              {fase.pregunta && <p className="m-metodo__question">{fase.pregunta}</p>}
              {fase.descripcion && <p className="m-metodo__description">{fase.descripcion}</p>}
            </li>
          ))}
        </ol>

        <div className="m-wrap m-metodo__controls">
          <p className="m-metodo__count" aria-live="polite">
            <strong>{numero(activa)}</strong> / {numero(FASES.length - 1)}
          </p>
          <div className="m-metodo__arrows">
            <button
              type="button"
              aria-label="Fase anterior"
              disabled={enFin.inicio}
              onClick={() => {
                tocar()
                irA(activa - 1)
              }}
            >
              <IconArrowLeft />
            </button>
            <button
              type="button"
              aria-label="Fase siguiente"
              disabled={enFin.fin}
              onClick={() => {
                tocar()
                irA(activa + 1)
              }}
            >
              <IconArrow />
            </button>
          </div>
        </div>
      </div>
      <div className="m-strip" />
    </section>
  )
}
