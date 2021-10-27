import {cssVars, maxWidth} from '../const'

export const Content = ({
  children,
  style = {},
}: {
  children: React.ReactNode
  style?: any
}) => {
  return (
    <div
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        display: 'flex',
      }}
    >
      <div
        data-test-id={'inner content wrapper'}
        style={{
          paddingRight: cssVars.contentPad,
          paddingLeft: cssVars.contentPad,
          maxWidth,
          width: '100%',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  )
}
