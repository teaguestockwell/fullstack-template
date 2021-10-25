import React from 'react'
import debounce from 'lodash/debounce'

export const useBottomScroll = (cb: () => void, offset = 0) =>
  React.useEffect(() => {
    const handle = debounce(() => {
      if (
        window.innerHeight + window.scrollY + offset >=
        document.body.offsetHeight
      ) {
        cb()
      }
    }, 200)

    window.addEventListener('scroll', handle)

    return () => window.removeEventListener('scroll', handle)
  }, [cb, offset])
