import equipo from '../assets/img/equipo.webp'
import mapa from '../assets/img/mapa-claro-vertical.webp'
import globe from '../assets/icons/icon-globe.svg'
import person from '../assets/icons/icon-person.svg'
import capitol from '../assets/icons/icon-capitol.svg'
import handshake from '../assets/icons/icon-handshake.svg'
import Eyebrow from './Eyebrow'
import TitleStack from './TitleStack'
import './MundoCambio.css'

const PILARES = [
  { icon: globe, label: 'Visión\ncompartida', height: 34 },
  { icon: person, label: 'Fortalecer la\ncooperación', height: 34 },
  { icon: capitol, label: 'Promover\ncompromisos', height: 35 },
  { icon: handshake, label: 'Networking\nejecutivo', height: 25 },
]

export default function MundoCambio() {
  return (
    <section className="mundo" id="vision">
      <div className="mundo__map px-bg" aria-hidden="true">
        <img src={mapa} alt="" />
        <img src={mapa} alt="" />
      </div>

      <div className="container">
        <div className="mundo__intro">
          <Eyebrow className="mundo__eyebrow">El mundo cambió</Eyebrow>

          <TitleStack
            className="mundo__title"
            lines={[
              { text: 'La forma de', tone: 'navy', width: 494, height: 68, size: 44, tracking: -0.009 },
              { text: 'Comprender el estado', tone: 'white', width: 535, height: 72, size: 43, tracking: -0.015 },
              { text: 'También debe hacerlo', tone: 'orange', width: 587, height: 76, size: 47, tracking: -0.009 },
            ]}
          />

          <p className="mundo__text">
            <strong>FORO DE ESTADO</strong> nace para cerrar esa brecha, articulando a las comunidades
            de inteligencia, tomadores de decisión, estrategas políticos, líderes del sector
            corporativo y demás actores estratégicos.
          </p>

          <h3 className="mundo__subtitle">Para construir una Visión de Estado</h3>
          <ul className="mundo__pillars">
            {PILARES.map((pilar) => (
              <li key={pilar.label}>
                <img src={pilar.icon} alt="" style={{ height: pilar.height }} />
                <span>{pilar.label}</span>
              </li>
            ))}
        </ul>
        </div>

        <div className="mundo__photo">
          <img src={equipo} alt="Equipo de Goberna en la Escuela de Inteligencia y Estrategia" />
        </div>
      </div>
    </section>
  )
}
