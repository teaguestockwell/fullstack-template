import '@testing-library/jest-dom/extend-expect'
import MatchMediaMock from 'jest-matchmedia-mock'
jest.setTimeout(100000)
import {server} from './msw'

let matchMedia

beforeAll(() => {
  matchMedia = new MatchMediaMock()

  // local storage mock
  const store = {
    lastSync: '123',
  } as any

  global.Storage.prototype.setItem = jest.fn((key, value) => {
    store[key] = value
  })

  global.Storage.prototype.getItem = jest.fn((key) => store[key])

  server.listen()
})

afterEach(() => {
  jest.clearAllMocks()
  server.resetHandlers()
})

afterAll(() => server.close())
