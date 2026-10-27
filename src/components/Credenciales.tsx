import mapa from '../assets/img/mapa-claro-credenciales.webp'
import events from '../assets/icons/cred-events.svg'
import network from '../assets/icons/cred-network.svg'
import community from '../assets/icons/cred-community.svg'
import research from '../assets/icons/cred-research.svg'
import Eyebrow from './Eyebrow'
import './Credenciales.css'

const CREDENCIALES = [
  { icon: events, titulo: 'Eventos\nEspecializados', texto: 'Organización de espacios académicos y de análisis' },
  { icon: network, titulo: 'Red Internacional\nde expertos', texto: 'Acceso a líderes, consultores y especialistas' },
  { icon: community, titulo: 'Comunidad\nprofesional', texto: 'Vinculación con actores políticos, públicos y privados' },
  { icon: research, titulo: 'Eventos\nEspecializados', texto: 'Desarrollo de contenidos, metodologías e investigaciones' },
]

export default function Credenciales() {
  return (
    <section className="credenciales" id="trayectoria">
      <div className="credenciales__map" aria-hidden="true">
        <img src={mapa} alt="" />
      </div>

      <div className="container">
        <Eyebrow className="credenciales__eyebrow">Tracción y credenciales</Eyebrow>

        <p className="credenciales__years" aria-label="Más de 12 años de experiencia">
          <span className="credenciales__plus">+</span>
          <span className="credenciales__twelve">12</span>
        </p>
        <div className="credenciales__info">
          <h2 className="credenciales__title">
            Años de
            <br />
            experiencia
          </h2>
          <p className="credenciales__text">
            Trayectoria de Grupo Goberna en formación, análisis y articulación en asuntos de Estado.
          </p>
          <p className="credenciales__claim">
            Una trayectoria que respalda la proyección internacional de Foro de Estado
          </p>
        </div>

        <ul className="credenciales__grid">
          {CREDENCIALES.map((item, i) => (
            <li key={item.texto}>
              <span className="credenciales__num">{String(i + 1).padStart(2, '0')}</span>
              <img src={item.icon} alt="" width={40} height={40} />
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
