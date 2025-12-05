import { useCallback, useRef } from 'react'

type InfiniteScrollObserverOptions = {
  enabled?: boolean
  rootMargin?: string
  root?: Element | null // The scrollable container element
  onIntersect: () => void // callback when the last element appears
}

export function useInfiniteScrollObserver({
  enabled = true,
  rootMargin = '200px',
  root = null,
  onIntersect,
}: InfiniteScrollObserverOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!enabled) return

      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      // Create new observer
      observerRef.current = new IntersectionObserver(
        entries => {
          if (entries[0]?.isIntersecting && enabled) {
            onIntersect()
          }
        },
        { rootMargin, root }
      )

      // Observe the new last node
      if (node) observerRef.current.observe(node)
    },
    [enabled, rootMargin, root, onIntersect]
  )

  return lastElementRef
}
