// Contenido compartido por el escritorio y el mobile. Los campos de posición
// (x, height) son medidas del escritorio; el mobile los ignora.
import globe from '../assets/icons/icon-globe.svg'
import person from '../assets/icons/icon-person.svg'
import capitol from '../assets/icons/icon-capitol.svg'
import handshake from '../assets/icons/icon-handshake.svg'
import events from '../assets/icons/cred-events.svg'
import network from '../assets/icons/cred-network.svg'
import community from '../assets/icons/cred-community.svg'
import research from '../assets/icons/cred-research.svg'
import institute from '../assets/icons/lic-institute.svg'
import document from '../assets/icons/lic-document.svg'
import shield from '../assets/icons/lic-shield.svg'
import callcenter from '../assets/icons/lic-callcenter.svg'
import business from '../assets/icons/lic-business.svg'
import medal from '../assets/icons/lic-medal.svg'
import diagnostico from '../assets/img/diagnostico.webp'

// El mundo cambió
export const PILARES = [
  { icon: globe, label: 'Visión\ncompartida', height: 34 },
  { icon: person, label: 'Fortalecer la\ncooperación', height: 34 },
  { icon: capitol, label: 'Promover\ncompromisos', height: 35 },
  { icon: handshake, label: 'Networking\nejecutivo', height: 29 },
]

// ¿Por qué ahora?
export const DATOS = [
  { titulo: 'Fragmentación\npúblico - privada', cifra: '32', unidad: '%', detalle: 'Confianza en\ngobiernos', x: 828 },
  { titulo: 'Riesgos\ncrecientes', cifra: '32', unidad: '%', detalle: 'Confianza en\npartidos', x: 1120 },
  { titulo: 'Falta de espacios\nde decisión', cifra: '1 de cada 2', detalle: 'Homicidios\nvinculados al\ncrimen organizado', x: 1420 },
]

// ¿Qué es el Foro de Estado?
export const NO_ES = ['No es un congreso', 'No es un seminario', 'No es un evento tradicional']

export const EJES = [
  { icon: globe, titulo: 'Plataforma internacional', texto: 'Un espacio que trasciende fronteras para pensar el Estado.', x: 242 },
  { icon: person, titulo: 'Factores de poder', texto: 'Reúne a líderes y actores estratégicos de cada país.', x: 760 },
  { icon: handshake, titulo: 'Unidad estratégica', texto: 'Articula visiones diversas en torno a objetivos comunes.', x: 1267 },
]

// Metodología. Las cuatro fases usan por ahora la misma foto.
export const FASES = [
  {
    titulo: 'Diagnóstico',
    pregunta: '¿Qué problema o desafío se analiza antes del foro?',
    descripcion:
      'Definición de agenda estratégica basada en los principales desafíos del país/región.',
    imagen: diagnostico,
  },
  {
    titulo: 'Convocatoria',
    pregunta: '¿A quiénes reunimos y por qué?',
    descripcion: 'Una construcción de una red de actores estratégicos convocados.',
    imagen: diagnostico,
  },
  {
    titulo: 'Deliberación',
    pregunta: 'Análisis, discusión y generación de conocimiento.',
    descripcion: 'Desarrollo de ideas, conclusiones y propuestas.',
    imagen: diagnostico,
  },
  {
    titulo: 'Compromisos',
    pregunta: '¿Qué acciones salen después del encuentro?',
    descripcion: 'Compromisos definidos entre actores participantes',
    imagen: diagnostico,
  },
]

/** Tiempo que el slider de fases se queda en cada una */
export const FASE_MS = 7000

// ¿Qué hace escalable al Foro? El XD solo trae la descripción del punto 01.
export const PUNTOS = [
  {
    titulo: 'Presupuesto de defensa y ejecución del Fondo.',
    destacado: 'Necesidad creciente',
    descripcion: ' de espacios para el análisis estratégico del Estado.',
  },
  { titulo: 'Estado real de la recapitalización naval y aérea.', destacado: '', descripcion: '' },
  { titulo: 'Marco legal del uso de la fuerza.', destacado: '', descripcion: '' },
  { titulo: 'Sostenibilidad de la Caja de Pensiones Militar Policial.', destacado: '', descripcion: '' },
  { titulo: 'Ciberdefensa.', destacado: '', descripcion: '' },
]

// Tracción y credenciales
export const CREDENCIALES = [
  { icon: events, titulo: 'Eventos\nEspecializados', texto: 'Organización de espacios académicos y de análisis' },
  { icon: network, titulo: 'Red Internacional\nde expertos', texto: 'Acceso a líderes, consultores y especialistas' },
  { icon: community, titulo: 'Comunidad\nprofesional', texto: 'Vinculación con actores políticos, públicos y privados' },
  { icon: research, titulo: 'Eventos\nEspecializados', texto: 'Desarrollo de contenidos, metodologías e investigaciones' },
]

// ¿Qué obtiene el licenciatario?
export const BENEFICIOS = [
  { icon: institute, destacado: 'Derecho', texto: ' de representación\noficial en su país.' },
  { icon: document, destacado: 'Manuales', texto: ' de operación,\ncomunicación e identidad.' },
  { icon: shield, destacado: 'Uso autorizado', texto: ' de la marca\n', marca: true },
  { icon: callcenter, destacado: 'Acompañamiento\nestratégico', texto: ' durante todo el\nproceso.' },
  { icon: business, destacado: 'Metodología exclusiva', texto: ' para\ndesarrollar el evento.' },
  { icon: medal, destacado: 'Uso autorizado', texto: ' de la marca\n', marca: true },
]
