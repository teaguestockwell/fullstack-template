// by wrapping every api route with this middleware,
// we can use helper methods that throw: ex if the user did not give a primary key
// the error bubbles up to this handler and it sends the encoded error message as a response
export class ApiError extends Error {
  readonly status: number
  readonly body: any
  readonly name: string

  constructor({status, body}: {status: number; body: any}) {
    super('ApiError')
    this.status = status
    this.body = body
    this.name = 'ApiError'
  }
}

export const usingMiddleware = async (
  _req: Types.Next.NextApiRequest,
  res: Types.Next.NextApiResponse,
  handler: () => Promise<void>
) => {
  await handler().catch((e) => {
    if (e.name === 'ApiError') {
      res.status(e.status).send(e.body)
    } else {
      console.trace(e)
      res.status(500).send('server error')
    }
  })
}
