import { useEffect, useState } from 'react'
import diagnostico from '../assets/img/diagnostico.webp'
import Eyebrow from './Eyebrow'
import TitleStack from './TitleStack'
import './Metodologia.css'

// El XD solo trae el contenido completo de la fase 01; el resto queda pendiente.
const FASES = [
  {
    titulo: 'Diagnóstico',
    pregunta: '¿Qué problema o desafío se analiza antes del foro?',
    descripcion:
      'Definición de agenda estratégica basada en los principales desafíos del país/región.',
    imagen: diagnostico,
  },
  { titulo: 'Convocatoria', pregunta: '', descripcion: '', imagen: diagnostico },
  { titulo: 'Deliberación', pregunta: '', descripcion: '', imagen: diagnostico },
  { titulo: 'Compromisos', pregunta: '', descripcion: '', imagen: diagnostico },
]

const AUTOPLAY_MS = 7000

const numero = (i: number) => String(i + 1).padStart(2, '0')

export default function Metodologia() {
  const [activa, setActiva] = useState(0)
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    if (pausado) return
    const id = setTimeout(() => setActiva((i) => (i + 1) % FASES.length), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [activa, pausado])

  const mover = (paso: number) => setActiva((i) => (i + paso + FASES.length) % FASES.length)
  const fase = FASES[activa]

  return (
    <section className="metodo" id="modelo">
      <div className="metodo__intro">
        <div className="container">
          <Eyebrow variant="short" className="metodo__eyebrow">
            Metodología operativa
          </Eyebrow>
          <TitleStack
            className="metodo__title"
            lines={[
              { text: 'Un proceso en', tone: 'white', width: 540, height: 84, size: 60, tracking: -0.015 },
              { text: '4 fases', tone: 'orange', width: 413, height: 89, size: 70, tracking: -0.009 },
            ]}
          />
          <p className="metodo__text">
            <strong>La Visión de Estado</strong> no surge de una única disciplina, una sola
            experiencia o una única forma de pensar.
            <br />
            <br />
            Se construye integrando el interés nacional a través de un modelo estandarizado que
            transforma el diálogo estratégico en resultados de largo plazo.
          </p>
        </div>
      </div>

      <div
        className="container metodo__slider"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
      >
        <div className="metodo__photo">
          <img key={activa} src={fase.imagen} alt="" />
        </div>

        <div className="metodo__detail" key={activa}>
          <p className="metodo__number">{numero(activa)}</p>
          <h3 className="metodo__phase">{fase.titulo}</h3>
          {fase.pregunta && <p className="metodo__question">{fase.pregunta}</p>}
          {fase.descripcion && <p className="metodo__description">{fase.descripcion}</p>}
        </div>

        <div className="metodo__arrows">
          <button type="button" aria-label="Fase anterior" onClick={() => mover(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5m6-6-6 6 6 6" />
            </svg>
          </button>
          <button type="button" aria-label="Fase siguiente" onClick={() => mover(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
        </div>

        <ol className="metodo__tabs">
          {FASES.map((f, i) => (
            <li key={f.titulo}>
              <button
                type="button"
                className={i === activa ? 'is-active' : ''}
                aria-current={i === activa}
                onClick={() => setActiva(i)}
              >
                <span>{numero(i)}</span>
                {f.titulo}
                {i === activa && (
                  <i
                    className="metodo__progress"
                    style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: pausado ? 'paused' : 'running' }}
                  />
                )}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="strip" />
    </section>
  )
}
