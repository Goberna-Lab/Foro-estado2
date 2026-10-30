import { useState } from 'react'
import redGlobal from '../assets/img/red-global.webp'
import { PUNTOS } from '../data/contenido'
import Eyebrow from './Eyebrow'
import TitleStack from './TitleStack'
import './Escalable.css'

export default function Escalable() {
  const [abierto, setAbierto] = useState(0)

  return (
    <section className="escalable">
      <div className="escalable__bg" aria-hidden="true">
        <img className="px-bg" src={redGlobal} alt="" />
      </div>

      <div className="container">
        <Eyebrow className="escalable__eyebrow">El mundo cambió</Eyebrow>
        <TitleStack
          className="escalable__title"
          lines={[
            { text: '¿Qué hace', tone: 'band', width: 448, height: 72, size: 60, tracking: -0.009, shift: -5 },
            { text: 'escalable al', tone: 'white', width: 507, height: 76, size: 60, tracking: -0.015, shift: -7 },
            { text: 'FORO DE ESTADO', tone: 'orange', width: 570, height: 80, size: 60, tracking: -0.009 },
          ]}
        />
        <p className="escalable__text">
          <strong>FORO DE ESTADO</strong> ha sido concebido como un modelo de expansión
          internacional, combinando una metodología replicable, una red de alto nivel integrada por
          altos funcionarios de inteligencia y altos funcionarios políticos de Goberna, y un
          ecosistema de valor que facilita su implementación en distintos países.
        </p>

        <ul className="escalable__list">
          {PUNTOS.map((punto, i) => {
            const abiertoAhora = abierto === i
            return (
              <li key={punto.titulo} className={abiertoAhora ? 'is-open' : ''}>
                <button
                  type="button"
                  aria-expanded={abiertoAhora}
                  onClick={() => setAbierto(abiertoAhora ? -1 : i)}
                >
                  <span className="escalable__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="escalable__body">
                    <span className="escalable__item-title">{punto.titulo}</span>
                    {abiertoAhora && punto.descripcion && (
                      <span className="escalable__item-text">
                        <strong>{punto.destacado}</strong>
                        {punto.descripcion}
                      </span>
                    )}
                  </span>
                  <span className="escalable__plus" aria-hidden="true">
                    +
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
