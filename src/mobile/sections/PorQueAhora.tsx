import stand from '../../assets/img/stand-goberna.webp'
import { DATOS } from '../../data/contenido'
import { sinSaltos } from '../text'

export default function PorQueAhora() {
  return (
    <section className="m-ahora">
      <div className="m-ahora__photo" data-unveil>
        <img src={stand} alt="Stand de Goberna con el mapa de América Latina" loading="lazy" data-parallax="60" />
      </div>

      <div className="m-section m-ahora__body">
        <div className="m-wrap">
          <p className="m-label" data-reveal>
            ¿Por qué ahora?
          </p>
          <h2 className="m-h2" data-reveal>
            <span className="m-ahora__accent">América Latina</span> enfrenta un entorno de mayor
            complejidad institucional, política y estratégica.
          </h2>
          <span className="m-hr" data-line aria-hidden="true" />

          <ul className="m-ahora__stats" data-stagger>
            {DATOS.map((dato) => (
              <li key={dato.titulo}>
                <p className={`m-ahora__figure${dato.unidad ? '' : ' m-ahora__figure--texto'}`}>
                  {dato.unidad ? <span data-count={dato.cifra}>{dato.cifra}</span> : dato.cifra}
                  {dato.unidad && <small>{dato.unidad}</small>}
                </p>
                <div>
                  <h3>{sinSaltos(dato.titulo)}</h3>
                  <p className="m-ahora__detail">{sinSaltos(dato.detalle)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="m-strip" />
    </section>
  )
}
