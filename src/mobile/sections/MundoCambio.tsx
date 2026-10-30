import equipo from '../../assets/img/equipo.webp'
import { PILARES } from '../../data/contenido'
import MTitle from '../MTitle'

export default function MundoCambio() {
  return (
    <section className="m-section m-mundo" id="vision">
      <div className="m-wrap">
        <p className="m-label" data-reveal>
          El mundo cambió
        </p>
        <MTitle
          lines={[
            { text: 'La forma de', tone: 'navy' },
            { text: 'comprender el Estado', tone: 'white', size: 0.84 },
            { text: 'también debe hacerlo', tone: 'orange', size: 0.84 },
          ]}
        />
        <p className="m-text" data-reveal>
          <strong>FORO DE ESTADO</strong> nace para cerrar esa brecha, articulando a las comunidades
          de inteligencia, tomadores de decisión, estrategas políticos, líderes del sector
          corporativo y demás actores estratégicos.
        </p>

        <div className="m-photo m-mundo__photo" data-unveil>
          <img
            src={equipo}
            alt="Equipo de Goberna en la Escuela de Inteligencia y Estrategia"
            loading="lazy"
            data-parallax="36"
          />
        </div>

        <h3 className="m-h3 m-mundo__subtitle" data-reveal>
          Para construir una Visión de Estado
        </h3>
        <ul className="m-mundo__pillars" data-stagger>
          {PILARES.map((pilar) => (
            <li key={pilar.label}>
              <img src={pilar.icon} alt="" />
              <span>{pilar.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
