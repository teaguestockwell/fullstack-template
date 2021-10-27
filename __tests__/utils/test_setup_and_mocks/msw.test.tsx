import axios from 'axios'
import {useQuery} from 'react-query'
import {renderWrapped, screen} from '../setup/render_wrapped'

const getHealth = async () => {
  const res = (await axios.get('/api/health')) as any
  return res.data.status
}

const Test = () => {
  const q = useQuery('health', getHealth)

  if (q.isLoading) return <div>Loading</div>
  if (q.isError) return <div>Error</div>
  if (!q.data) return <div>No data</div>
  return <div>{q.data}</div>
}

it('mocks api calls', async () => {
  renderWrapped(<Test />)
  expect(screen.getByText('Loading')).toBeInTheDocument()
  expect(await screen.findByText('ok')).toBeInTheDocument()
})
