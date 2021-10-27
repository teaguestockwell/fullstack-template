import {signIn, useSession} from 'next-auth/client'
import {useEffect} from 'react'
import {LoadingText} from '../components/loading_text'

// https://github.com/nextauthjs/next-auth/issues/1210#issuecomment-782630909

/**
 * This hook allows you to redirect client side for pages that are exported
 * with Page.auth = true. This could be useful when you have a SSR page,
 * that is only usable for logged in users because it queries protected api routes.
 */
const Effect = ({children}: {children: any}) => {
  const [session, loading] = useSession()
  const isUser = !!session?.user

  useEffect(() => {
    if (loading) return // do nothing while loading
    if (!isUser) signIn('google') // force log in
  }, [isUser, loading])

  if (isUser) {
    return children
  }

  // the session is being fetched
  return <LoadingText text="Please wait one moment while we log you in." />
}

export const WithClientAuth = ({
  children,
  hasAuth = false,
}: {
  children: any
  hasAuth?: boolean
}) => {
  if (hasAuth) {
    return <Effect>{children}</Effect>
  }

  return children
}
