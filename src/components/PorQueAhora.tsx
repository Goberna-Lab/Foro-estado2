import stand from '../assets/img/stand-goberna.webp'
import './PorQueAhora.css'

const DATOS = [
  { titulo: 'Fragmentación\npúblico - privada', cifra: '32', unidad: '%', detalle: 'Confianza en\ngobiernos', x: 828 },
  { titulo: 'Riesgos\ncrecientes', cifra: '32', unidad: '%', detalle: 'Confianza en\npartidos', x: 1120 },
  { titulo: 'Falta de espacios\nde decisión', cifra: '1 de cada 2', detalle: 'Homicidios\nvinculados al\ncrimen organizado', x: 1420 },
]

export default function PorQueAhora() {
  return (
    <section className="ahora">
      <div className="ahora__photo">
        <img src={stand} alt="Stand de Goberna con el mapa de América Latina" />
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
