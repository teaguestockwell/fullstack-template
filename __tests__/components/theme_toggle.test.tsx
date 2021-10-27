import {ThemeToggle} from '../../components/theme_toggle'
import {renderWrapped, screen} from '../utils/setup/render_wrapped'

it('renders', () => {
  renderWrapped(<ThemeToggle />)
  expect(screen.getByTestId('toggle-system')).toBeInTheDocument()
})

it('changes the theme', () => {
  renderWrapped(<ThemeToggle />)
  expect(screen.getByTestId('toggle-system')).toBeInTheDocument()
  screen.getByTestId('toggle-system').click()
  expect(screen.queryAllByTestId('toggle-system').length).toBe(0)
})
