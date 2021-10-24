import create from 'zustand'
import {combine} from 'zustand/middleware'

export const useStore = create(
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
      <button
        style={{display: 'flex'}}
        onClick={() => useStore.setState({count: s.count + 1})}
      >
        Inc
      </button>
      <button
        style={{display: 'flex'}}
        onClick={() => useStore.setState({count: s.count - 1})}
      >
        Dec
      </button>
    </>
  )
}

const ViewCount = () => {
  const s = useStore()
  return <div>{s.count}</div>
}

export const Zustand = () => {
  return (
    <>
      <Counter />
      <ViewCount />
    </>
  )
}
