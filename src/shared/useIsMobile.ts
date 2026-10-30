import { useSyncExternalStore } from 'react'
import { MOBILE_QUERY } from './breakpoint'

const mql = typeof window === 'undefined' ? null : window.matchMedia(MOBILE_QUERY)

const subscribe = (cb: () => void) => {
  mql?.addEventListener('change', cb)
  return () => mql?.removeEventListener('change', cb)
}

/** true por debajo de 1024px: ahí se monta la app mobile en lugar del escritorio */
export const useIsMobile = () => useSyncExternalStore(subscribe, () => mql?.matches ?? false, () => false)
