import escenario from '../../assets/img/escenario.webp'
import quote from '../../assets/icons/quote-open.svg'
import { EJES, NO_ES } from '../../data/contenido'
import { palabras } from '../text'

const TITULO = 'Una plataforma internacional que articula líderes y actores estratégicos para pensar'
const DESTACADO = 'el destino de las naciones.'

export default function QueEsForo() {
  return (
    <section className="m-que">
      {/* Foto + degradado en una capa casi fija; termina en navy como la sección */}
      <div className="m-que__bg" aria-hidden="true" data-lento="0.7">
        <img src={escenario} alt="" loading="lazy" />
      </div>

      <div className="m-section m-que__body">
        <div className="m-wrap">
          <p className="m-label m-label--light" data-reveal>
            ¿Qué es el Foro de Estado?
          </p>
          <h2 className="m-h2 m-que__title" data-words>
            {palabras(TITULO).map((p, i) => (
              <span key={i} className="m-word">
                {p}{' '}
              </span>
            ))}
            {palabras(DESTACADO).map((p, i) => (
              <span key={`d${i}`} className="m-word m-que__accent">
                {p}{' '}
              </span>
            ))}
          </h2>

          <p className="m-label m-label--light m-que__not-label" data-reveal>
            No es lo que esperas
          </p>
          <ul className="m-que__not" data-list>
            {NO_ES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {/* Línea de tiempo vertical que se dibuja con el scroll */}
          <div className="m-que__axes">
            <span className="m-que__axis-line" data-line="y" aria-hidden="true" />
            <ul>
              {EJES.map((eje) => (
                <li key={eje.titulo} data-reveal>
                  <img src={eje.icon} alt="" />
                  <h3>{eje.titulo}</h3>
                  <p>{eje.texto}</p>
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="m-que__quote" data-reveal>
            <img className="m-que__quote-open" src={quote} alt="" />
            <p className="m-que__quote-label">Como vitrina del liderazgo</p>
            <p>
              FORO DE ESTADO proyecta el liderazgo de gobernantes, ministros, magistrados, jefes de
              inteligencia, líderes del sector privado y otros actores estratégicos, brindándoles un
              espacio para presentar sus visiones, experiencias y posiciones frente a los grandes
              desafíos del Estado.
            </p>
            <img className="m-que__quote-close" src={quote} alt="" />
          </blockquote>
        </div>
      </div>
      <div className="m-strip" />
    </section>
  )
}
