import React from 'react'

export const useShowScrollbar = () =>
  React.useEffect(() => {
    document.documentElement.style.overflowY = 'scroll'

    return () => {
      document.documentElement.style.overflowY = 'auto'
    }
  }, [])
