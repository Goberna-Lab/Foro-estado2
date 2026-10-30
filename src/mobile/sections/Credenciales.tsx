import mapa from '../../assets/img/mapa-claro-credenciales.webp'
import { CREDENCIALES } from '../../data/contenido'
import { sinSaltos } from '../text'

export default function Credenciales() {
  return (
    <section className="m-section m-cred" id="trayectoria">
      <div className="m-cred__map" aria-hidden="true">
        <img src={mapa} alt="" loading="lazy" data-parallax="90" />
      </div>

      <div className="m-wrap">
        <p className="m-label" data-reveal>
          Tracción y credenciales
        </p>

        <div className="m-cred__head">
          <p className="m-cred__years" aria-label="Más de 12 años de experiencia">
            <span aria-hidden="true">+</span>
            <span aria-hidden="true" data-count="12">
              12
            </span>
          </p>
          <h2 className="m-cred__title" data-reveal>
            Años de
            <br />
            experiencia
          </h2>
        </div>
        <p className="m-text" data-reveal>
          Trayectoria de Grupo Goberna en formación, análisis y articulación en asuntos de Estado.
        </p>
        <p className="m-cred__claim" data-reveal>
          Una trayectoria que respalda la proyección internacional de Foro de Estado
        </p>

        <ul className="m-cred__grid" data-stagger>
          {CREDENCIALES.map((item, i) => (
            <li key={item.texto}>
              <span className="m-cred__num">{String(i + 1).padStart(2, '0')}</span>
              <img src={item.icon} alt="" width={40} height={40} />
              <h3>{sinSaltos(item.titulo)}</h3>
              <p>{item.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
