import {render, screen} from '@testing-library/react'
import {Avatar} from '../../components/avatar'

it('renders without an src', () => {
  render(<Avatar />)
  expect(screen.queryAllByRole('button')).toHaveLength(1)
})
