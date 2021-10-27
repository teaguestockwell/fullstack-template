import {Provider as NextAuthProvider} from 'next-auth/client'
import {ThemeProvider} from 'next-themes'
import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

export const Providers = ({
  children,
  pageProps,
}: {
  children: JSX.Element | JSX.Element[]
  pageProps: any
}) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          panelProps={{style: {top: 58, bottom: ''}}}
        />
        <NextAuthProvider
          session={pageProps?.session}
          options={{clientMaxAge: 0, keepAlive: 0}}
        >
          {children}
        </NextAuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
