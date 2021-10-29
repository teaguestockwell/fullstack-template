import {cssVars} from '../const'

export const LoadingText = ({
  text,
  style = {},
}: {
  text: string
  style?: React.CSSProperties
}) => {
  return (
    <h1
      style={{
        display: 'flex',
        justifyContent: 'center',
        fontSize: 18,
        color: cssVars.color.font[1],
        paddingTop: 20,
        paddingBottom: 20,
        ...style,
      }}
    >
      {text}
    </h1>
  )
}
