/* eslint-disable react/jsx-props-no-spreading */
import AccountCircle from '@material-ui/icons/AccountCircle'
import Link from 'next/link'
import {cssVars} from '../const'

export const Avatar = ({
  src,
  props,
  href,
  style = {},
  alt = '',
  size = 36,
  hoverOverride = false,
}: {
  alt?: string | null | undefined
  href?: string
  src?: string | null | undefined
  props?: any
  style?: React.CSSProperties
  size?: number
  hoverOverride?: boolean
}) => {
  const props2 = {
    ...props,
    src,
    alt,
    style: {
      borderRadius: 100,
      height: size,
      width: size,
      border: cssVars.color.border,
      ...style,
    },
  }

  const hover =
    href || hoverOverride
      ? {
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: cssVars.color.hoverBg,
          },
          '&:focus': {
            backgroundColor: cssVars.color.hoverBg,
          },
        }
      : {}

  return (
    <Link href={href ?? ''} passHref>
      <button
        aria-label="sign in or out"
        css={{height: size, width: size, borderRadius: 100, ...hover, ...style}}
      >
        {props2.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img {...props2} loading="lazy" alt="avatar" />
        ) : (
          <AccountCircle
            {...props}
            width={size}
            style={{
              fontSize: size,
              color: cssVars.color.font[1],
              borderRadius: 100,
            }}
            css={hover}
          />
        )}
      </button>
    </Link>
  )
}
