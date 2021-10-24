import {render, screen} from '@testing-library/react'
import {Zustand} from '../../components/zustand'

it('renders', () => {
  render(<Zustand />)
  expect(screen.getByText('0')).toBeInTheDocument()
})

it('increments', () => {
  render(<Zustand />)
  expect(screen.getByText('0')).toBeInTheDocument()

  screen.getByText('Inc').click()
  expect(screen.getByText('1')).toBeInTheDocument()
})

// starting from 0 again because the cleanup 'zustand' is working
it('decrements', () => {
  render(<Zustand />)
  expect(screen.getByText('0')).toBeInTheDocument()

  screen.getByText('Dec').click()
  expect(screen.getByText('-1')).toBeInTheDocument()
})
