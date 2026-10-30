import Desktop from './Desktop'
import MobileApp from './mobile/MobileApp'
import { useIsMobile } from './shared/useIsMobile'

// Por debajo de 1024px se monta otra app pensada para el teléfono, no el
// escritorio encogido. Comparten contenido (src/data) y anclas.
export default function App() {
  return useIsMobile() ? <MobileApp /> : <Desktop />
}
