import capitolio from '../../assets/img/capitolio-fondo.webp'
import { BENEFICIOS } from '../../data/contenido'
import MTitle from '../MTitle'
import { sinSaltos } from '../text'

export default function Licenciatario() {
  return (
    <section className="m-section m-lic" id="licencia">
      <div className="m-lic__bg" aria-hidden="true">
        <img src={capitolio} alt="" loading="lazy" data-parallax="110" />
      </div>

      <div className="m-wrap">
        <p className="m-label m-label--light" data-reveal>
          Licencia
        </p>
        <MTitle
          weight={700}
          lines={[
            { text: '¿Qué obtiene', tone: 'white' },
            { text: 'el licenciatario?', tone: 'orange', size: 1.08 },
          ]}
        />

        <ul className="m-lic__grid" data-stagger>
          {BENEFICIOS.map((item, i) => (
            <li key={i}>
              <span className="m-lic__icon">
                <img src={item.icon} alt="" />
              </span>
              <p>
                <strong>{sinSaltos(item.destacado)}</strong>
                {sinSaltos(item.texto)}
                {item.marca && <strong className="m-lic__brand"> FORO DE ESTADO.</strong>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
