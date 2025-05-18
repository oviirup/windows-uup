import { useMediaQuery } from './use-media-query'

export const BREAKPOINT_MOBILE = 768 - 1

export function useMobile() {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINT_MOBILE}px)`)
  return isMobile
}
