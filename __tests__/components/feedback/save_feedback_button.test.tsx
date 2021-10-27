import {SaveFeedbackButton} from '../../../components/feedback/save_feedback_button'
import {renderWrapped, screen} from '../../utils/setup/render_wrapped'

it('renders', () => {
  renderWrapped(<SaveFeedbackButton />)
  expect(screen.getByText('Save')).toBeInTheDocument()
})
