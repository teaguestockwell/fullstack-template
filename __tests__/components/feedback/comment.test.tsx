import {Comment} from '../../../components/feedback/comment'
import {useFeedback} from '../../../hooks/use_feedback'
import {render, screen, fireEvent} from '@testing-library/react'

it('renders', () => {
  const comment = useFeedback.store.getState().comment
  expect(comment).toBe('')
  render(<Comment />)
})

it('renders with init value', () => {
  useFeedback.store.setState({comment: 'test'})
  render(<Comment />)
  expect(screen.getByText('test')).toBeInTheDocument()
})

it('updates store when typing', () => {
  useFeedback.store.setState({comment: 'test'})
  render(<Comment />)
  const input = screen.getByText('test')
  fireEvent.change(input, {target: {value: 'test2'}})
  expect(screen.getByText('test2')).toBeInTheDocument()
  expect(useFeedback.store.getState().comment).toBe('test2')
})
