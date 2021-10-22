import {usingMethods} from '../../middleware/using_methods'

it('return accepted method', async () => {
  const req: any = {
    method: 'GET',
  }

  const method = await usingMethods(req, ['GET'])

  expect(method).toBe('GET')
})

it('throws un allowed methods', async () => {
  const req: any = {
    method: 'GET',
  }

  await expect(usingMethods(req, ['PUT'])).rejects.toThrow()
})
