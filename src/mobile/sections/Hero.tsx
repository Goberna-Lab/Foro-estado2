import type { CSSProperties } from 'react'
import mapa from '../../assets/img/hero-mapa.webp'
import brillo from '../../assets/img/hero-brillo.webp'
import foro from '../../assets/icons/foro-word.svg'
import bracketTop from '../../assets/icons/bracket-tl.svg'
import bracketBottom from '../../assets/icons/bracket-br.svg'
import { CIUDADES, DE_ESTADO, LIMA, arco } from '../../shared/redHero'

const delay = (i: number) => ({ '--i': i }) as CSSProperties

export default function Hero() {
  return (
    <section className="m-hero" id="inicio">
      <div className="m-hero__glow" aria-hidden="true">
        <img src={brillo} alt="" fetchPriority="high" />
      </div>

      <div className="m-hero__content" data-hundir="18">
        <div className="m-hero__text">
          <p className="m-hero__eyebrow m-hero__reveal" style={delay(0)}>
            Licencia internacional
          </p>
          <h1 className="m-hero__title">
            <img className="m-hero__reveal" style={delay(1)} src={foro} alt="Foro" width={577} height={158} />
            <span className="m-hero__reveal" style={delay(2)} aria-label="de Estado">
              {DE_ESTADO.map(([letra, tracking], i) => (
                <span key={i} aria-hidden="true" style={{ letterSpacing: `${tracking}em` }}>
                  {letra}
                </span>
              ))}
            </span>
          </h1>
          <p className="m-hero__subtitle m-hero__reveal" style={delay(3)}>
            Conviértase en el representante oficial <span>en su país</span>
          </p>
          <p className="m-hero__note m-hero__reveal" style={delay(4)}>
            Modelo de licenciamiento internacional de Grupo Goberna para llevar el Foro de Estado a
            tu país.
          </p>
        </div>

        {/* Escenario: el mapa ocupa el alto que queda, así el texto nunca lo tapa */}
        <div className="m-hero__stage">
          <div className="m-hero__scene" aria-hidden="true" data-parallax="40">
            <div className="m-hero__frame">
              <div className="m-hero__drift">
                <img className="m-hero__map" src={mapa} alt="" fetchPriority="high" />
                <svg className="m-hero__network" viewBox="0 0 1920 949">
                  {CIUDADES.map((c, i) => (
                    <g key={c.nombre} style={delay(i)}>
                      <path className="m-hero__arc" d={arco(c.x, c.y)} pathLength={1} />
                      <path className="m-hero__pulse" d={arco(c.x, c.y)} pathLength={1} />
                      <circle className="m-hero__ring" cx={c.x} cy={c.y} r={9} />
                      <circle className="m-hero__city" cx={c.x} cy={c.y} r={8} />
                    </g>
                  ))}
                  <g style={delay(0)}>
                    <circle className="m-hero__ring m-hero__ring--hub" cx={LIMA.x} cy={LIMA.y} r={12} />
                    <circle className="m-hero__city m-hero__city--hub" cx={LIMA.x} cy={LIMA.y} r={11} />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div className="m-hero__region" aria-hidden="true">
            <img src={bracketTop} alt="" />
            <p>
              América
              <br />
              Latina
            </p>
            <img src={bracketBottom} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
