import * as React from 'react'
import { isEmpty } from '@/lib/assertions'

/**
 * Hook to check if a media query matches the current viewport.
 *
 * @param query - The media query to check against
 * @param initialState - The initial state, default: false
 * @returns Boolean indicating whether the media query matches
 */
export function useMediaQuery(query: string, initialState = false) {
  if (isEmpty(query)) {
    throw Error(`useMediaQuery: 'query' must not be empty`)
  }

  const [matches, setMatches] = React.useState(initialState)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia(query)
    const ctrl = new AbortController()
    // check if the media query matches the initial state
    if (media.matches !== matches) setMatches(media.matches)
    // add event listener
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener, { signal: ctrl.signal })
    // cleanup
    return () => media.removeEventListener('change', listener)
  }, [query, matches])

  return matches
}
