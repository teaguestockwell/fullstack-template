import {render, screen} from '@testing-library/react'
import {EmojiRate} from '../../../components/feedback/emoji_rate'
import {useFeedback} from '../../../hooks/use_feedback'

it('renders', () => {
  expect(useFeedback.store.getState().rating).toBe(undefined)
  render(<EmojiRate store={useFeedback.store} />)
  expect(useFeedback.store.getState().rating).toBe(undefined)
  expect(screen.getByLabelText('emoji rating')).toBeInTheDocument()
})

it('changes feedback on click', () => {
  render(<EmojiRate store={useFeedback.store} />)

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
