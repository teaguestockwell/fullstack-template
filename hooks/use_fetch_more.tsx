import React from 'react'

export const UseFetchMore = ({fetchMore}: {fetchMore: () => void}) => {
  const ref = React.useRef(null) as any

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: '200px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(fetchMore, options)

    if (ref?.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [fetchMore])

  return <div data-testid="use-fetch-more" ref={ref}></div>
}
