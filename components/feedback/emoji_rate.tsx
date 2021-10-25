import {cssVars} from '../../const'

const emojis = ['😭', '😕', '😐', '😊', '😍']

/**
 * @param store a zustand store that has a rating property
 */
export const EmojiRate = ({
  store,
  cb = (rating: number) => {},
}: {
  store: any
  cb?: (rating: number) => void
}) => {
  const selected = store((s: any) => s.rating)

  return (
    <div
      aria-label="emoji rating"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 57,
      }}
    >
      {emojis.map((emoji, rating) => (
        <button
          key={emoji}
          onClick={() => {
            cb(rating)
            store.setState((s: any) => ({
              rating: s.rating === rating ? undefined : rating,
            }))
          }}
          arai-label={`${rating + 1} of ${emojis.length}`}
          css={{
            fontSize: '1.5rem',
            lineHeight: '1.5rem',
            borderRadius: '50%',
            transform: rating === selected ? 'scale(1.5)' : 'scale(1)',
            textShadow:
              rating === selected
                ? `0px 0px 5px ${cssVars.color.font[0]}`
                : 'none',
            '&:hover, &:focus': {
              textShadow: `0px 0px 5px ${cssVars.color.font[0]}`,
            },
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}
