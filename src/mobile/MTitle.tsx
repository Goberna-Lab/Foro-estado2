type Tone = 'navy' | 'white' | 'orange' | 'ink'

export type MTitleLine = {
  text: string
  tone: Tone
  /** Tamaño relativo a la franja base (1 = tamaño de .m-title) */
  size?: number
}

type Props = {
  lines: MTitleLine[]
  weight?: 700 | 800
  className?: string
}

// Título en franjas apiladas, como en escritorio, con líneas cortadas para el
// ancho del teléfono. Las franjas se descubren al entrar en pantalla (data-wipe).
export default function MTitle({ lines, weight = 800, className = '' }: Props) {
  return (
    <h2 className={`m-title ${className}`} style={{ fontWeight: weight }} data-wipe>
      {lines.map((line) => (
        <span
          key={line.text}
          className={`m-title__line m-title__line--${line.tone}`}
          style={line.size ? { fontSize: `${line.size}em` } : undefined}
        >
          {line.text}
        </span>
      ))}
    </h2>
  )
}
