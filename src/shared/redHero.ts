// Red de conexiones del hero, en px del hero de escritorio (1920×949).
// El mobile dibuja la misma red con el mismo viewBox.

// Coordenadas de las capitales sobre la foto del mapa. La red sale desde
// Lima, sede de Goberna.
export const LIMA = { x: 1317, y: 425 }
export const CIUDADES = [
  { nombre: 'Ciudad de México', x: 1125, y: 165 },
  { nombre: 'Panamá', x: 1315, y: 262 },
  { nombre: 'Bogotá', x: 1365, y: 300 },
  { nombre: 'Caracas', x: 1445, y: 248 },
  { nombre: 'São Paulo', x: 1600, y: 560 },
  { nombre: 'Buenos Aires', x: 1538, y: 602 },
  { nombre: 'Santiago', x: 1427, y: 615 },
]

// Arco curvo entre Lima y la ciudad, abombado hacia arriba
export function arco(x: number, y: number) {
  const mx = (LIMA.x + x) / 2
  const my = (LIMA.y + y) / 2
  const dx = x - LIMA.x
  const dy = y - LIMA.y
  const curva = 0.3
  const lado = dx >= 0 ? 1 : -1
  return `M${LIMA.x} ${LIMA.y} Q${mx + dy * curva * lado} ${my - Math.abs(dx) * curva} ${x} ${y}`
}

// En el XD "DE ESTADO" lleva un interletrado distinto en cada letra
export const DE_ESTADO: [string, number][] = [
  ['D', -0.05],
  ['E', -0.049],
  [' ', -0.049],
  ['E', -0.056],
  ['S', -0.068],
  ['T', -0.108],
  ['A', -0.049],
  ['D', -0.05],
  ['O', 0],
]
