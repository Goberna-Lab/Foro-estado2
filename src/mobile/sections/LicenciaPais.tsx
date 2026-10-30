import auditorio from '../../assets/img/auditorio.webp'
import MTitle from '../MTitle'
import { alClicAncla } from '../anchors'
import { IconArrow } from '../icons'

export default function LicenciaPais() {
  return (
    <section className="m-pais">
      <div className="m-strip" />
      <div className="m-pais__bg" aria-hidden="true">
        <img src={auditorio} alt="" loading="lazy" data-parallax="120" />
      </div>

      <div className="m-section m-pais__body">
        <div className="m-wrap">
          <p className="m-label" data-reveal>
            Licencia País
          </p>
          <MTitle
            lines={[
              { text: 'Un espacio que', tone: 'navy' },
              { text: 'trasciende fronteras para', tone: 'white', size: 0.76 },
              { text: 'PENSAR EL ESTADO', tone: 'orange' },
            ]}
          />
          <a className="m-btn m-btn--outline m-pais__cta" href="#trayectoria" onClick={alClicAncla} data-reveal>
            Conoce su experiencia
            <IconArrow />
          </a>
        </div>
      </div>
    </section>
  )
}
