/** Quita los saltos de línea pensados para el escritorio */
export const sinSaltos = (texto: string) => texto.replace(/\s*\n\s*/g, ' ')

/** Separa un texto en palabras (.m-word) para animarlas con data-words */
export const palabras = (texto: string) => texto.split(' ')
