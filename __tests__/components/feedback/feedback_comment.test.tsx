import {fireEvent, render, screen} from '@testing-library/react'
import {FeedbackComment} from '../../../components/feedback/feedback_comment'
import {feedback} from '../../../hooks/use_feedback'

it('renders', () => {
  const comment = feedback.useStore.getState().comment
  expect(comment).toBe('')
  render(<FeedbackComment />)
})

it('renders with init value', () => {
  feedback.useStore.setState({comment: 'test'})
  render(<FeedbackComment />)
  expect(screen.getByText('test')).toBeInTheDocument()
})

it('updates useStore when typing', () => {
  feedback.useStore.setState({comment: 'test'})
  render(<FeedbackComment />)
  const input = screen.getByText('test')
  fireEvent.change(input, {target: {value: 'test2'}})
  expect(screen.getByText('test2')).toBeInTheDocument()
  expect(feedback.useStore.getState().comment).toBe('test2')
})
