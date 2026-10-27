import type { CSSProperties, MouseEvent } from 'react'
import mapa from '../assets/img/hero-mapa.webp'
import brillo from '../assets/img/hero-brillo.webp'
import foro from '../assets/icons/foro-word.svg'
import bracketTop from '../assets/icons/bracket-tl.svg'
import bracketBottom from '../assets/icons/bracket-br.svg'
import './Hero.css'

// Coordenadas (px del hero a 1920) de las capitales sobre la foto del mapa.
// La red sale desde Lima, sede de Goberna.
const LIMA = { x: 1317, y: 425 }
const CIUDADES = [
  { nombre: 'Ciudad de México', x: 1125, y: 165 },
  { nombre: 'Panamá', x: 1315, y: 262 },
  { nombre: 'Bogotá', x: 1365, y: 300 },
  { nombre: 'Caracas', x: 1445, y: 248 },
  { nombre: 'São Paulo', x: 1600, y: 560 },
  { nombre: 'Buenos Aires', x: 1538, y: 602 },
  { nombre: 'Santiago', x: 1427, y: 615 },
]

// Arco curvo entre Lima y la ciudad, abombado hacia arriba
function arco(x: number, y: number) {
  const mx = (LIMA.x + x) / 2
  const my = (LIMA.y + y) / 2
  const dx = x - LIMA.x
  const dy = y - LIMA.y
  const curva = 0.3
  const lado = dx >= 0 ? 1 : -1
  return `M${LIMA.x} ${LIMA.y} Q${mx + dy * curva * lado} ${my - Math.abs(dx) * curva} ${x} ${y}`
}

const delay = (i: number) => ({ '--i': i }) as CSSProperties

export default function Hero() {
  // Paralaje suave del mapa siguiendo el mouse
  const mover = (e: MouseEvent<HTMLElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - box.left) / box.width - 0.5
    const y = (e.clientY - box.top) / box.height - 0.5
    e.currentTarget.style.setProperty('--px', `${(-x * 24).toFixed(1)}px`)
    e.currentTarget.style.setProperty('--py', `${(-y * 16).toFixed(1)}px`)
  }

  return (
    <section className="hero" id="inicio" onMouseMove={mover}>
      <div className="hero__scene" aria-hidden="true">
        <div className="hero__drift">
          <img className="hero__map" src={mapa} alt="" />
          <svg className="hero__network" viewBox="0 0 1920 949">
            {CIUDADES.map((c, i) => (
              <g key={c.nombre} style={delay(i)}>
                <path className="hero__arc" d={arco(c.x, c.y)} pathLength={1} />
                <path className="hero__pulse" d={arco(c.x, c.y)} pathLength={1} />
                <circle className="hero__ring" cx={c.x} cy={c.y} r={4} />
                <circle className="hero__city" cx={c.x} cy={c.y} r={3} />
              </g>
            ))}
            <g style={delay(0)}>
              <circle className="hero__ring hero__ring--hub" cx={LIMA.x} cy={LIMA.y} r={6} />
              <circle className="hero__city hero__city--hub" cx={LIMA.x} cy={LIMA.y} r={5} />
            </g>
          </svg>
        </div>
      </div>
      <div className="hero__glow">
        <img src={brillo} alt="" />
      </div>

      <div className="container hero__content">
        <p className="hero__eyebrow hero__reveal" style={delay(0)}>
          Licencia internacional
        </p>
        <h1 className="hero__title">
          <img className="hero__reveal" style={delay(1)} src={foro} alt="Foro" width={577} height={158} />
          <span className="hero__reveal" style={delay(2)}>
            de Estado
          </span>
        </h1>
        <p className="hero__subtitle hero__reveal" style={delay(3)}>
          Conviértase en el representante oficial
          <br />
          <span>en su país</span>
        </p>
        <p className="hero__note hero__reveal" style={delay(4)}>
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
