import * as React from 'react'

type DependencyList = readonly unknown[]

/**
 * Hook to run a callback function on a specified interval.
 *
 * @param callback - The function that will be executed on each interval.
 * @param {number} delay - Delay in milliseconds
 */
export function useInterval(
  callback: () => void,
  delay: number,
  deps: DependencyList,
) {
  const timerRef = React.useRef<NodeJS.Timeout>(null)
  const callbackRef = React.useRef(callback)
  // safely store the callback
  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])
  // run the callback on specified interval
  React.useEffect(() => {
    const tick = () => callbackRef.current()
    if (typeof delay === 'number') {
      timerRef.current = setInterval(tick, delay)
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps])
  return timerRef
}
