import type {AppProps} from 'next/app'
import {ThemeProvider} from 'next-themes'
import '../global_styles/global_styles.css'
// import {domain} from '../const'

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />

      {/* <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: `https://${domain}`,
            site_name: 'Buildable',
            title: 'Buildable',
            description: 'Explore and share buildable items',
            images: [
              {
                url: `https://${domain}/og-1200-630.png`,
                height: 630,
                width: 1200,
                alt: 'Buildable logo',
              },
            ],
          }}
        /> */}

      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
