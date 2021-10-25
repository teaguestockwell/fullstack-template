import {render, screen} from '@testing-library/react'
import {LoadingText} from '../../components/loading_text'

it('renders', () => {
  render(<LoadingText text="Loading..." />)
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})
