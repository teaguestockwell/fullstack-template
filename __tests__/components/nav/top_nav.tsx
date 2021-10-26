import {TopNav} from '../../../components/nav/top_nav'
import {renderWrapped, screen} from '../../utils/setup/render_wrapped'
import {title} from '../../../const'

it('renders', () => {
  renderWrapped(<TopNav />)
  expect(screen.getByText(title)).toBeInTheDocument()
})
