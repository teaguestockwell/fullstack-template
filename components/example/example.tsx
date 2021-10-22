import {ThemeToggle} from './theme_toggle'
import {GlobalTypes} from './global_types'
import {Emotion} from './emotion'

export const Example = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <GlobalTypes one={{foo: 'hello', bar: 'world'}} />

      <Emotion />

      <ThemeToggle />
    </div>
  )
}
