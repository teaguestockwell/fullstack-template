import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import Link from 'next/link'
import {cssVars} from '../../const'
import {Avatar} from '../avatar'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
const formatDate = (date: Date) => {
  date = typeof date === 'string' ? new Date(date) : date
  return timeAgo.format(date, 'twitter-minute-now')
}

const emojis = ['😭', '😕', '😐', '😊', '😍']

export const InfiniteFeedbackItem = ({
  feedback,
}: {
  feedback: Types.Feedback.WithUser
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: 15,
      }}
    >
      <Avatar
        src={feedback.user.oauthImgSrc}
        props={{style: {left: 0, top: 0}}}
        href={''}
      />

      <div
        style={{
          padding: 6,
          borderRadius: 10,
          fontSize: 16,
          marginLeft: 8,
          minHeight: 74,
          backgroundColor: cssVars.color.bg[1],
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <Link passHref href={''}>
            <button
              css={{
                fontWeight: 600,
                borderRadius: 10,
                paddingLeft: 6,
                paddingRight: 6,
                '&:hover, &:focus': {backgroundColor: cssVars.color.hoverBg},
              }}
            >
              {feedback.user.oauthName}
            </button>
          </Link>

          <p
            style={{
              paddingLeft: 12,
              fontWeight: 100,
              color: cssVars.color.font[1],
              paddingRight: 6,
            }}
          >
            {formatDate(feedback.createdAt)}
          </p>
        </div>

        <Link passHref href={''}>
          <button
            css={{
              fontWeight: 600,
              borderRadius: 10,
              paddingLeft: 6,
              paddingRight: 6,
              '&:hover, &:focus': {backgroundColor: cssVars.color.hoverBg},
            }}
          >
            {'Session: ' +
              feedback.gameSessionId +
              ' ' +
              emojis[feedback.rating]}
          </button>
        </Link>

        <p style={{marginLeft: 6}}>{feedback.comment}</p>
      </div>
    </div>
  )
}
