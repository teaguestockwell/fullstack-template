import {render, screen} from '@testing-library/react'
import {GlobalTypes} from '../../components/global_types'

it('renders', () => {
  render(<GlobalTypes one={{foo: 'hello', bar: 'world'}} />)
  expect(screen.getByText('hello world')).toBeInTheDocument()
})
