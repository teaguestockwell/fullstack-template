import {render, screen} from '@testing-library/react'
import create from 'zustand'
import {combine} from 'zustand/middleware'

const useStore = create(
  combine(
    {
      count: 0,
    },
    (set) => ({set})
  )
)

const Counter = () => {
  const s = useStore()

  return (
    <>
      <button onClick={() => useStore.setState({count: s.count + 1})}>
        Inc
      </button>
      <button onClick={() => useStore.setState({count: s.count - 1})}>
        Dec
      </button>
    </>
  )
}

const ViewCount = () => {
  const s = useStore()
  return <div>{s.count}</div>
}

const Zustand = () => {
  return (
    <>
      <Counter />
      <ViewCount />
    </>
  )
}

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
