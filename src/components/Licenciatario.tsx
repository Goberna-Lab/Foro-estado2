import capitolio from '../assets/img/capitolio-fondo.webp'
import { BENEFICIOS } from '../data/contenido'
import Eyebrow from './Eyebrow'
import TitleStack from './TitleStack'
import './Licenciatario.css'

export default function Licenciatario() {
  return (
    <section className="licenciatario" id="licencia">
      <div className="licenciatario__bg" aria-hidden="true">
        <img className="px-bg" src={capitolio} alt="" />
      </div>

      <div className="container">
        <Eyebrow variant="short" className="licenciatario__eyebrow">
          Licencia
        </Eyebrow>
        <TitleStack
          className="licenciatario__title"
          weight={700}
          lines={[
            { text: '¿Qué obtiene', tone: 'white', width: 513, height: 84, size: 60, tracking: -0.015, shift: 3 },
            { text: 'El licenciatario?', tone: 'orange', width: 617, height: 89, size: 70, tracking: -0.009 },
          ]}
        />

        <ul className="licenciatario__grid">
          {BENEFICIOS.map((item, i) => (
            <li key={i}>
              <span className="licenciatario__icon">
                <img src={item.icon} alt="" />
              </span>
              <p>
                <strong>{item.destacado}</strong>
                {item.texto}
                {item.marca && <strong className="licenciatario__brand">FORO DE ESTADO.</strong>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
