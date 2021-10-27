import {FeedbackPage} from '../../../components/feedback/feedback_page'
import {renderWrapped, screen} from '../../utils/setup/render_wrapped'

const feedback: Types.Prisma.Feedback = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: '1',
  gameSessionId: '1',
  comment: 'tests',
  rating: 1,
}

it('renders with initial data', () => {
  renderWrapped(<FeedbackPage initialData={feedback} />)
  expect(screen.getByText('Feedback')).toBeInTheDocument()
  expect(screen.getByText('tests')).toBeInTheDocument()
})

it('renders without initial data', () => {
  renderWrapped(<FeedbackPage initialData={null} />)
  expect(screen.getByText('Feedback')).toBeInTheDocument()
  expect(screen.queryAllByText('tests').length).toBe(0)
})
