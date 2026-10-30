import { useState } from 'react'
import redGlobal from '../../assets/img/red-global.webp'
import { PUNTOS } from '../../data/contenido'
import MTitle from '../MTitle'
import { IconPlus } from '../icons'

export default function Escalable() {
  const [abierto, setAbierto] = useState(0)

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
            { text: 'FORO DE ESTADO', tone: 'orange' },
          ]}
        />
        <p className="m-text" data-reveal>
          <strong>FORO DE ESTADO</strong> ha sido concebido como un modelo de expansión
          internacional, combinando una metodología replicable, una red de alto nivel integrada por
          altos funcionarios de inteligencia y altos funcionarios políticos de Goberna, y un
          ecosistema de valor que facilita su implementación en distintos países.
        </p>

        <ul className="m-escalable__list" data-stagger>
          {PUNTOS.map((punto, i) => {
            const abiertoAhora = abierto === i
            return (
              <li key={punto.titulo} className={abiertoAhora ? 'is-open' : ''}>
                <button
                  type="button"
                  aria-expanded={abiertoAhora}
                  onClick={() => setAbierto(abiertoAhora ? -1 : i)}
                >
                  <span className="m-escalable__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="m-escalable__body">
                    <span className="m-escalable__item-title">{punto.titulo}</span>
                    {abiertoAhora && punto.descripcion && (
                      <span className="m-escalable__item-text">
                        <strong>{punto.destacado}</strong>
                        {punto.descripcion}
                      </span>
                    )}
                  </span>
                  <IconPlus className="m-escalable__plus" />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
