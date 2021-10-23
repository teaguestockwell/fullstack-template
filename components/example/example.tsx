import {ThemeToggle} from './theme_toggle'
import {GlobalTypes} from './global_types'
import {Emotion} from './emotion'
import {Zustand} from './zustand'
import {getPath} from '../../utils'
import Link from 'next/link'
import {UserAccountAvatar} from './user_account_avatar'
import {signOut} from '../../node_modules/next-auth/client'

const RandomPost = () => {
  // random string between 0 and 999
  const postId = Math.floor(Math.random() * 1000).toString()
  return <Link href={getPath.mockPost.view({postId})}>Random Post</Link>
}

export const Example = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <GlobalTypes one={{foo: 'hello', bar: 'world'}} />

      <Emotion />

      <Zustand />

      <RandomPost />

      <ThemeToggle />

      <UserAccountAvatar onClick={() => signOut()} />
    </div>
  )
}
