import {cssVars} from '../../const'

export const Emotion = () => {
  return (
    <>
      <button
        css={{
          '&:hover, &:focus': {backgroundColor: cssVars.color.hoverBg},
        }}
      >
        example hover and focus inline styles
      </button>

      <p
        css={{
          [cssVars.size.mq.lg]: {textTransform: 'uppercase'},
        }}
      >
        example uppercase when media query is lg
      </p>
    </>
  )
}
