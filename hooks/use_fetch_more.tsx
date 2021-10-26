import React from 'react'

export const UseFetchMore = ({fetchMore}: {fetchMore: () => void}) => {
  const ref = React.useRef(null) as any

  React.useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
    const options = {
      root: null,
      // setting the root margin to high will cause the observer to fire in an infinite loop if it is rendered under lazy loaded elements
      rootMargin: '50px',
      // this does not matter since the div has no height
      threshold: 1.0,
    }

    const shouldFetchMore: IntersectionObserverCallback = (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        fetchMore()
      }
    }

    const observer = new IntersectionObserver(shouldFetchMore, options)

    if (ref?.current) {
      observer.observe(ref.current)
    }

    return () => {
      // disconnect is better then unobserve in this case because there is a chance of passing a null element to the unobserve
      observer.disconnect()
    }
  }, [fetchMore])

  return <div data-testid="use-fetch-more" ref={ref}></div>
}
