import {Save} from '../../../components/feedback/save'
import {renderWrapped, screen} from '../../utils/setup/render_wrapped'

it('renders', () => {
  renderWrapped(<Save />)
  expect(screen.getByText('Save')).toBeInTheDocument()
})
