import {ApiError, usingMiddleware} from '../../middleware/using_middleware'

it('catches server errors', async () => {
  let status
  let send
  let called = false

  const req: any = {}

  const res: any = {
    status: (s: any) => {
      status = s
    },
    json: (s: any) => {
      send = s
    },
  }

  const handler = async () => {
    called = true
    throw new Error('test')
  }

  await usingMiddleware(req, res, handler)

  expect(status).toBe(500)
  expect(send).toStrictEqual({msg: 'server error'})
  expect(called).toBe(true)
})

it('handles api errors', async () => {
  let status
  let send
  let called = false

  const req: any = {}

  const res: any = {
    status: (s: any) => {
      status = s
    },
    json: (s: any) => {
      send = s
    },
  }

  const handler = async () => {
    called = true
    throw new ApiError({status: 400, body: {msg: 'test'}})
  }

  await usingMiddleware(req, res, handler)

  expect(status).toBe(400)
  expect(send).toStrictEqual({msg: 'test'})
  expect(called).toBe(true)
})
