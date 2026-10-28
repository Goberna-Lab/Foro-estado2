import medalla from '../assets/img/medalla.webp'
import mapa from '../assets/img/mapa-claro-precio.webp'
import calendar from '../assets/icons/price-calendar.svg'
import chart from '../assets/icons/price-chart.svg'
import invest from '../assets/icons/price-invest.svg'
import { WHATSAPP_URL } from '../data/sitio'
import TitleStack from './TitleStack'
import './Inversion.css'

export default function Inversion() {
  return (
    <section className="inversion" id="inversion">
      <div className="inversion__photo" aria-hidden="true">
        <img src={medalla} alt="" />
        <span className="inversion__shine" />
      </div>
      <div className="inversion__map" aria-hidden="true">
        <img className="px-bg" src={mapa} alt="" />
      </div>

      <div className="container">
        <TitleStack
          className="inversion__title"
          weight={700}
          lines={[
            { text: 'Canon de', tone: 'white', width: 355, height: 84, size: 60, tracking: -0.015 },
            { text: 'Licencia', tone: 'orange', width: 422, height: 89, size: 70, tracking: -0.009 },
            { text: 'Internacional', tone: 'ink', width: 508, height: 89, size: 70, tracking: -0.009 },
          ]}
        />
        <p className="inversion__term">Vigencia: 1 año</p>

        <div className="inversion__panel">
          <div className="inversion__price">
            <p className="inversion__badge">
              <img src={calendar} alt="" width={32} height={34} />
              Tarifa vigente hasta
            </p>
            <p className="inversion__date">31 DIC 2026</p>
            <p className="inversion__amount">USD 7,000</p>
          </div>

          <div className="inversion__row inversion__row--card">
            <span className="inversion__icon inversion__icon--gray">
              <img src={chart} alt="" />
            </span>
            <p>
              <span className="inversion__from">Desde enero de 2027</span>
              <span className="inversion__later">USD 20,000</span>
            </p>
          </div>

          <div className="inversion__row">
            <span className="inversion__icon">
              <img src={invest} alt="" />
            </span>
            <p className="inversion__note">
              Una inversión para representar oficialmente <strong>FORO DE ESTADO</strong> y
              desarrollar una plataforma con potencial de crecimiento en su país.
            </p>
          </div>

          <a className="inversion__cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Solicitar una conversación estratégica
          </a>
        </div>
      </div>
    </section>
  )
}
