import mapa from '../assets/img/hero-mapa.webp'
import brillo from '../assets/img/hero-brillo.webp'
import foro from '../assets/icons/foro-word.svg'
import bracketTop from '../assets/icons/bracket-tl.svg'
import bracketBottom from '../assets/icons/bracket-br.svg'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <img className="hero__map" src={mapa} alt="" />
      <div className="hero__glow">
        <img src={brillo} alt="" />
      </div>

      <div className="container hero__content">
        <p className="hero__eyebrow">Licencia internacional</p>
        <h1 className="hero__title">
          <img src={foro} alt="Foro" width={577} height={158} />
          <span>de Estado</span>
        </h1>
        <p className="hero__subtitle">
          Conviértase en el representante oficial
          <br />
          <span>en su país</span>
        </p>
        <p className="hero__note">
          Modelo de licenciamiento internacional de Grupo Goberna para llevar el Foro de Estado a tu
          país.
        </p>

        <div className="hero__region">
          <img src={bracketTop} alt="" />
          <p>
            América
            <br />
            Latina
          </p>
          <img src={bracketBottom} alt="" />
        </div>
      </div>
    </section>
  )
}
