import {usingMiddleware} from '../../../../../middleware/using_middleware'
import {client} from '../../../../../prisma/client'

export default async function handler(
  req: Types.Next.NextApiRequest,
  res: Types.Next.NextApiResponse
) {
  usingMiddleware(req, res, async () => {
    const inits = await client.init.findMany()

    res.status(200).json(inits)
  })
}

export const config = {
  api: {
    externalResolver: true,
  },
}
