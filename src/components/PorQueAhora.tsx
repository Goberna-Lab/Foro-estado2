import stand from '../assets/img/stand-goberna.webp'
import { DATOS } from '../data/contenido'
import './PorQueAhora.css'

export default function PorQueAhora() {
  return (
    <section className="ahora">
      <div className="ahora__photo">
        <img className="px-foto" src={stand} alt="Stand de Goberna con el mapa de América Latina" />
      </div>

      <div className="container">
        <p className="ahora__eyebrow">¿Por qué ahora?</p>
        <h2 className="ahora__title">
          <span>América Latina</span> enfrenta un entorno de mayor complejidad institucional,
          política y estratégica.
        </h2>

        <ul className="ahora__stats">
          {DATOS.map((dato) => (
            <li key={dato.titulo} style={{ left: dato.x }}>
              <h3>{dato.titulo}</h3>
              <p className="ahora__figure">
                {dato.cifra}
                {dato.unidad && <small>{dato.unidad}</small>}
              </p>
              <p className="ahora__detail">{dato.detalle}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="strip ahora__strip" />
    </section>
  )
}
