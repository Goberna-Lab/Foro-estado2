import './TitleStack.css'

type Tone = 'navy' | 'band' | 'white' | 'orange' | 'ink'

export type TitleLine = {
  text: string
  tone: Tone
  width: number
  height: number
  size: number
  tracking?: number
}

type Props = {
  lines: TitleLine[]
  weight?: 700 | 800
  as?: 'h1' | 'h2'
  className?: string
}

// Título en franjas apiladas (navy / blanco con sombra / degradado naranja)
export default function TitleStack({ lines, weight = 800, as: Tag = 'h2', className = '' }: Props) {
  return (
    <Tag className={`title-stack ${className}`} style={{ fontWeight: weight }}>
      {lines.map((line) => (
        <span
          key={line.text}
          className={`title-stack__line title-stack__line--${line.tone}`}
          style={{
            width: line.width,
            height: line.height,
            fontSize: line.size,
            letterSpacing: line.tracking ? `${line.tracking}em` : undefined,
          }}
        >
          {line.text}
        </span>
      ))}
    </Tag>
  )
}
