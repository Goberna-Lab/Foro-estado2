import capitolio from '../assets/img/capitolio-fondo.webp'
import institute from '../assets/icons/lic-institute.svg'
import document from '../assets/icons/lic-document.svg'
import shield from '../assets/icons/lic-shield.svg'
import callcenter from '../assets/icons/lic-callcenter.svg'
import business from '../assets/icons/lic-business.svg'
import medal from '../assets/icons/lic-medal.svg'
import Eyebrow from './Eyebrow'
import TitleStack from './TitleStack'
import './Licenciatario.css'

const BENEFICIOS = [
  { icon: institute, destacado: 'Derecho', texto: ' de representación\noficial en su país.' },
  { icon: document, destacado: 'Manuales', texto: ' de operación,\ncomunicación e identidad.' },
  { icon: shield, destacado: 'Uso autorizado', texto: ' de la marca\n', marca: true },
  { icon: callcenter, destacado: 'Acompañamiento\nestratégico', texto: ' durante todo el\nproceso.' },
  { icon: business, destacado: 'Metodología exclusiva', texto: ' para\ndesarrollar el evento.' },
  { icon: medal, destacado: 'Uso autorizado', texto: ' de la marca\n', marca: true },
]

export default function Licenciatario() {
  return (
    <section className="licenciatario" id="licencia">
      <div className="licenciatario__bg" aria-hidden="true">
        <img src={capitolio} alt="" />
      </div>

      <div className="container">
        <Eyebrow variant="short" className="licenciatario__eyebrow">
          Licencia
        </Eyebrow>
        <TitleStack
          className="licenciatario__title"
          weight={700}
          lines={[
            { text: '¿Qué obtiene', tone: 'white', width: 513, height: 84, size: 60, tracking: -0.015 },
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
