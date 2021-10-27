import {TopNav} from '../../../components/nav/top_nav'
import {title} from '../../../const'
import {renderWrapped, screen} from '../../utils/setup/render_wrapped'

it('renders', () => {
  renderWrapped(<TopNav />)
  expect(screen.getByText(title)).toBeInTheDocument()
})
