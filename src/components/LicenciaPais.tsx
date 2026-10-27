import auditorio from '../assets/img/auditorio.webp'
import arrow from '../assets/icons/arrow-thin.svg'
import Eyebrow from './Eyebrow'
import TitleStack from './TitleStack'
import './LicenciaPais.css'

export default function LicenciaPais() {
  return (
    <section className="pais">
      <div className="strip" />
      <div className="pais__bg" aria-hidden="true">
        <img className="px-bg" src={auditorio} alt="" />
      </div>

      <div className="container">
        <Eyebrow className="pais__eyebrow">Licencia País</Eyebrow>
        <TitleStack
          className="pais__title"
          lines={[
            { text: 'Un espacio que', tone: 'band', width: 520, height: 81, size: 60, tracking: -0.009 },
            { text: 'trasciende fronteras para', tone: 'white', width: 818, height: 86, size: 60, tracking: -0.015 },
            { text: 'PENSAR EL ESTADO', tone: 'orange', width: 642, height: 91, size: 60, tracking: -0.009 },
          ]}
        />
        <a className="pais__cta" href="#trayectoria">
          Conoce su experiencia
          <span style={{ maskImage: `url("${arrow}")` }} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
