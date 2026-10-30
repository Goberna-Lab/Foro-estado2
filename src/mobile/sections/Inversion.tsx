import medalla from '../../assets/img/medalla.webp'
import mapa from '../../assets/img/mapa-claro-precio.webp'
import calendar from '../../assets/icons/price-calendar.svg'
import chart from '../../assets/icons/price-chart.svg'
import invest from '../../assets/icons/price-invest.svg'
import { WHATSAPP_URL } from '../../data/sitio'
import MTitle from '../MTitle'
import { IconArrow } from '../icons'

export default function Inversion() {
  return (
    <section className="m-inv" id="inversion">
      {/* El título va sobre el fondo de la foto, no encima: la medalla queda a la vista */}
      <div className="m-inv__top">
        <div className="m-wrap m-inv__head">
          <MTitle
            weight={700}
            lines={[
              { text: 'Canon de', tone: 'white' },
              { text: 'Licencia', tone: 'orange', size: 1.16 },
              { text: 'Internacional', tone: 'ink', size: 1.16 },
            ]}
          />
          <p className="m-inv__term" data-reveal>
            Vigencia: 1 año
          </p>
        </div>
        <div className="m-inv__photo">
          {/* Foto y destello en la misma capa para que el parallax no los separe */}
          <div className="m-inv__capa" aria-hidden="true" data-parallax="40">
            <img src={medalla} alt="" loading="lazy" />
            <span className="m-inv__shine" />
          </div>
        </div>
      </div>

      <div className="m-section m-inv__body">
        <div className="m-inv__map" aria-hidden="true">
          <img src={mapa} alt="" loading="lazy" data-parallax="80" />
        </div>

        <div className="m-wrap m-inv__panel">
          <div className="m-inv__price" data-reveal>
            <p className="m-inv__badge">
              <img src={calendar} alt="" width={24} height={26} />
              Tarifa vigente hasta
            </p>
            <p className="m-inv__date">31 DIC 2026</p>
            <span className="m-inv__rule" data-line aria-hidden="true" />
            <p className="m-inv__amount">USD 7,000</p>
          </div>

          <div className="m-inv__row m-inv__row--card" data-reveal>
            <span className="m-inv__icon m-inv__icon--gray">
              <img src={chart} alt="" />
            </span>
            <p>
              <span className="m-inv__from">Desde enero de 2027</span>
              <span className="m-inv__later">USD 20,000</span>
            </p>
          </div>

          <div className="m-inv__row" data-reveal>
            <span className="m-inv__icon">
              <img src={invest} alt="" />
            </span>
            <p className="m-inv__note">
              Una inversión para representar oficialmente <strong>FORO DE ESTADO</strong> y
              desarrollar una plataforma con potencial de crecimiento en su país.
            </p>
          </div>

          <a className="m-btn m-btn--orange m-inv__cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer" data-reveal>
            Solicitar una conversación estratégica
            <IconArrow />
          </a>
        </div>
      </div>
    </section>
  )
}
