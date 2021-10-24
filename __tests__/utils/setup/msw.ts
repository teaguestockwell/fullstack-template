import {setupServer} from 'msw/node'
import {rest} from 'msw'

const server = setupServer(
  rest.get('/api/health', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.body(JSON.stringify({status: 'ok'})))
  })
)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
