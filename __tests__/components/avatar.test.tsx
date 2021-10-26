import {Avatar} from '../../components/avatar'
import {render, screen} from '@testing-library/react'

it('renders without an src', () => {
  render(<Avatar />)
  expect(screen.queryAllByRole('button')).toHaveLength(1)
})
