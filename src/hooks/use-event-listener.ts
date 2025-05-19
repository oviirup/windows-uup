import * as React from 'react'

// Windows Event based interface
export function useEventListener<EW extends keyof WindowEventMap>(
  event_name: EW,
  callback: (event: WindowEventMap[EW]) => void,
  opts?: null | AddEventListenerOptions,
  deps?: React.DependencyList,
  element?: undefined,
): void

// HTML Element Based interface
export function useEventListener<
  EH extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  event_name: EH,
  callback: (event: HTMLElementEventMap[EH]) => void,
  opts?: null | AddEventListenerOptions,
  deps?: React.DependencyList,
  element?: React.RefObject<T>,
): void

// Document Event based interface
export function useEventListener<ED extends keyof DocumentEventMap>(
  event_name: ED,
  callback: (event: DocumentEventMap[ED]) => void,
  opts?: null | AddEventListenerOptions,
  deps?: React.DependencyList,
  element?: React.RefObject<Document>,
): void

/**
 * Hook to use event listener
 *
 * @param event_name - Window or Element event name
 * @param callback - Callback function
 * @param element - Element to attach event listener to
 */
export function useEventListener<
  EW extends keyof WindowEventMap,
  EH extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  event_name: EW,
  callback: (
    event: WindowEventMap[EW] | HTMLElementEventMap[EH] | Event,
  ) => void,
  opts: null | AddEventListenerOptions = null,
  deps: React.DependencyList = [],
  element?: React.RefObject<T>,
) {
  // Create a ref that stores handler
  const handler = React.useRef(callback)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    // Define the listening target
    const targetElement: T | Window = element?.current || window
    if (!(targetElement && targetElement.addEventListener)) return

    const ctrl = new AbortController()
    // Add event listener
    const eventListener: typeof callback = (event) => {
      if (!!handler?.current) handler.current(event)
    }

    // add event listener
    const handlerOptions = Object.assign(
      { signal: ctrl.signal },
      opts === null ? {} : opts,
    )
    targetElement.addEventListener(event_name, eventListener, handlerOptions)

    // cleanup
    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event_name, element, callback, opts, ...deps])
}
