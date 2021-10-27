import {DefaultSeo} from 'next-seo'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {Providers} from '../components/providers'
import {description, domain, title} from '../const'
import {WithClientAuth} from '../hooks/with_client_auth'
import {WithTopNav} from '../hooks/with_top_nav'
import '../styles/global_styles.css'

interface PageProps {
  Component: {
    auth?: boolean
    topNav?: boolean
    title?: string
  }
}

export default function App({Component, pageProps}: AppProps & PageProps) {
  return (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />

      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: `https://${domain}`,
          site_name: title,
          title,
          description,
          images: [
            {
              url: `https://${domain}/og-1200-630.png`,
              height: 630,
              width: 1200,
              alt: `${domain} logo`,
            },
          ],
        }}
      />

      <Head>
        {/* When the page component is exported, check its props for things like title and auth */}
        <title>{Component.title ? Component.title : title}</title>
      </Head>

      <Providers pageProps={pageProps}>
        <WithTopNav hasNav={Component.topNav}>
          <WithClientAuth hasAuth={Component.auth}>
            <Component {...pageProps} />
          </WithClientAuth>
        </WithTopNav>
      </Providers>
    </>
  )
}
