import Link from 'next/link'
import {cssVars, title} from '../../const'
import Image from 'next/image'
import {UserAccountAvatar} from '../user_account_avatar'
import {signOut} from 'next-auth/client'
import {ThemeToggle} from '../theme_toggle'

export const TopNav = () => {
  const pad = 16

  return (
    <div
      style={{
        zIndex: 800,
        height: 58,
        backgroundColor: cssVars.color.nav,
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        paddingLeft: 0,
        paddingRight: 8,
        display: 'flex',
        borderBottom: cssVars.color.border,
        ...cssVars.shadow,
      }}
    >
      {/* Left flex */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link href="/" passHref>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginLeft: pad / 2,
              borderRadius: 10,
              padding: pad / 4,
            }}
            css={{
              '&:hover': {
                opacity: 0.8,
                backgroundColor: cssVars.color.hoverBg,
              },
              '&:focus': {
                opacity: 0.8,
                backgroundColor: cssVars.color.hoverBg,
              },
            }}
          >
            <Image src={'/logo.png'} width={40} height={40} alt={title} />

            <h1
              css={{
                fontWeight: 600,
                marginLeft: pad / 2,
                fontSize: '.6rem',
                lineHeight: '.6rem',
                [cssVars.size.mq.sm]: {
                  fontSize: '1rem',
                  lineHeight: '1rem',
                },
                [cssVars.size.mq.lg]: {
                  fontSize: '1.5rem',
                  lineHeight: '1.5rem',
                },
              }}
            >
              {title}
            </h1>
          </button>
        </Link>
      </div>

      {/* Center flex */}

      <div
        css={{
          display: 'flex',
          flexGrow: 999,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 0,
          marginRight: 0,
          [cssVars.size.mq.md]: {
            marginLeft: pad,
            marginRight: pad,
          },
        }}
      ></div>

      {/* Right flex */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{marginRight: pad}}>
          <ThemeToggle />
        </div>
        <UserAccountAvatar onClick={() => signOut()} />
      </div>
    </div>
  )
}
