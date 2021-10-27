import {FeedbackRate} from '../../../components/feedback/feedback_rate'
import {feedback} from '../../../hooks/use_feedback'
import {render, screen} from '@testing-library/react'

it('renders', () => {
  expect(feedback.useStore.getState().rating).toBe(undefined)
  render(<FeedbackRate store={feedback.useStore} />)
  expect(feedback.useStore.getState().rating).toBe(undefined)
  expect(screen.getByLabelText('emoji rating')).toBeInTheDocument()
})

it('changes feedback on click', () => {
  render(<FeedbackRate store={feedback.useStore} />)

  screen.getByText('😭').click()
  expect(feedback.useStore.getState().rating).toBe(0)

  screen.getByText('😕').click()
  expect(feedback.useStore.getState().rating).toBe(1)

  screen.getByText('😐').click()
  expect(feedback.useStore.getState().rating).toBe(2)

  screen.getByText('😊').click()
  expect(feedback.useStore.getState().rating).toBe(3)

  screen.getByText('😍').click()
  expect(feedback.useStore.getState().rating).toBe(4)
})
