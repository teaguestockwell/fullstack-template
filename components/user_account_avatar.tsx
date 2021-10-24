import {signIn} from 'next-auth/client'
import {useSession} from 'next-auth/client'
import {Avatar} from './avatar'

/*
 * If the user is logged in, show their avatar with the passed onclick callback.
 * Otherwise show a blank user that redirects to the sign in page when clicked
 */
export const UserAccountAvatar = ({onClick}: {onClick?: () => void}) => {
  const [session, loading] = useSession()

  if (!session || loading || !session.user) {
    return (
      <Avatar props={{onClick: () => signIn('google')}} hoverOverride={true} />
    )
  }

  return <Avatar props={{onClick}} src={session.user.image} />
}
