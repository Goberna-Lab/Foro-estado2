import escenario from '../assets/img/escenario.webp'
import globe from '../assets/icons/icon-globe.svg'
import person from '../assets/icons/icon-person.svg'
import handshake from '../assets/icons/icon-handshake.svg'
import quote from '../assets/icons/quote-open.svg'
import Eyebrow from './Eyebrow'
import './QueEsForo.css'

const NO_ES = ['No es un congreso', 'No es un seminario', 'No es un evento tradicional']

const EJES = [
  { icon: globe, titulo: 'Plataforma internacional', texto: 'Un espacio que trasciende fronteras para pensar el Estado.', x: 242 },
  { icon: person, titulo: 'Factores de poder', texto: 'Reúne a líderes y actores estratégicos de cada país.', x: 760 },
  { icon: handshake, titulo: 'Unidad estratégica', texto: 'Articula visiones diversas en torno a objetivos comunes.', x: 1267 },
]

export default function QueEsForo() {
  return (
    <section className="que-es">
      <div className="que-es__bg px-lento">
        <img src={escenario} alt="" />
      </div>

      <div className="container">
        <Eyebrow variant="short" className="que-es__eyebrow">
          ¿Qué es el Foro de Estado?
        </Eyebrow>
        <h2 className="que-es__title">
          Una plataforma internacional que articula líderes y actores estratégicos para pensar{' '}
          <span>el destino de las naciones.</span>
        </h2>

        <Eyebrow variant="short" className="que-es__eyebrow que-es__eyebrow--right">
          No es lo que esperas
        </Eyebrow>
        <ul className="que-es__not">
          {NO_ES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <ul className="que-es__axes">
          {EJES.map((eje) => (
            <li key={eje.titulo} style={{ left: eje.x }}>
              <img src={eje.icon} alt="" />
              <h3>{eje.titulo}</h3>
              <p>{eje.texto}</p>
            </li>
          ))}
        </ul>

        <blockquote className="que-es__quote">
          <img className="que-es__quote-open" src={quote} alt="" />
          <p className="que-es__quote-label">Como vitrina del liderazgo</p>
          <p>
            FORO DE ESTADO proyecta el liderazgo de gobernantes, ministros, magistrados, jefes de
            inteligencia, líderes del sector privado y otros actores estratégicos, brindándoles un
            espacio para presentar sus visiones, experiencias y posiciones frente a los grandes
            desafíos del Estado.
          </p>
          <img className="que-es__quote-close" src={quote} alt="" />
        </blockquote>
      </div>
      <div className="strip que-es__strip" />
    </section>
  )
}
