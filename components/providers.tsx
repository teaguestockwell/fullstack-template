import {ThemeProvider} from 'next-themes'
import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

export const Providers = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          panelProps={{style: {top: 58, bottom: ''}}}
        />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}
