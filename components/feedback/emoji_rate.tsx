import {cssVars} from '../../const'
import {useFeedback} from '../../hooks/use_feedback'

const emojis = ['😭', '😕', '😐', '😊', '😍']

export const EmojiRate = () => {
  const selected = useFeedback.store((s) => s.rating)

  return (
    <div
      aria-label="emoji rating"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '3.5rem',
      }}
    >
      {emojis.map((emoji, rating) => (
        <button
          key={emoji}
          onClick={() => useFeedback.store.setState({rating: rating})}
          arai-label={`${rating + 1} of ${emojis.length}`}
          css={{
            fontSize: '1.8rem',
            lineHeight: '1.8rem',
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
