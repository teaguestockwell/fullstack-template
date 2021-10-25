import {EmojiRate} from '../../../components/feedback/emoji_rate'
import {useFeedback} from '../../../hooks/use_feedback'
import {render, screen} from '@testing-library/react'

it('renders', () => {
  expect(useFeedback.store.getState().rating).toBe(undefined)
  render(<EmojiRate />)
  expect(useFeedback.store.getState().rating).toBe(undefined)
  expect(screen.getByLabelText('emoji rating')).toBeInTheDocument()
})

it('changes feedback on click', () => {
  render(<EmojiRate />)

  screen.getByText('😭').click()
  expect(useFeedback.store.getState().rating).toBe(0)

  screen.getByText('😕').click()
  expect(useFeedback.store.getState().rating).toBe(1)

  screen.getByText('😐').click()
  expect(useFeedback.store.getState().rating).toBe(2)

  screen.getByText('😊').click()
  expect(useFeedback.store.getState().rating).toBe(3)

  screen.getByText('😍').click()
  expect(useFeedback.store.getState().rating).toBe(4)
})
