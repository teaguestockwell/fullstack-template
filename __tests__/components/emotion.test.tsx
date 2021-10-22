import {screen, render} from '@testing-library/react'
import {Emotion} from '../../components/example/emotion'

it('renders', () => {
  render(<Emotion />)
  expect(
    screen.getByText('example hover and focus inline styles')
  ).toBeInTheDocument()
})
