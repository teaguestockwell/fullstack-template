import {render, screen} from '@testing-library/react'
import {Cell} from '../../../components/feedback/cell'

const mockFeedback: Types.Feedback.WithUser = {
  id: '1',
  user: {
    oauthImgSrc: 'img',
    oauthName: 'name',
  },
  userId: '1',
  gameSessionId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  comment: '',
  rating: 1,
}

it('renders', () => {
  render(<Cell feedback={mockFeedback} />)
  expect(screen.getByText('name')).toBeInTheDocument()
})
