import './Eyebrow.css'

type Props = {
  children: string
  // long: línea de 96px que sale hacia el margen izquierdo
  // short: línea de 40px antes del texto
  variant?: 'long' | 'short'
  className?: string
}

export default function Eyebrow({ children, variant = 'long', className = '' }: Props) {
  return <p className={`eyebrow eyebrow--${variant} ${className}`}>{children}</p>
}
