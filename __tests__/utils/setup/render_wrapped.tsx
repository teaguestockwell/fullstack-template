import {render as rtlRender} from '@testing-library/react'
import {Providers} from '../../../components/providers'

const Wrapper = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <>
      <Providers pageProps={{}}>{children}</Providers>
    </>
  )
}

const renderWrapped = (component: JSX.Element, options: any = {}) => {
  return rtlRender(component, {
    wrapper: function withWrapper(props) {
      return <Wrapper {...props} />
    },
    ...options,
  })
}

export * from '@testing-library/react'
export {renderWrapped}
