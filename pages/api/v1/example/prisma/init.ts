import {usingMiddleware} from '../../../../../middleware/using_middleware'
import {client} from '../../../../../prisma/client'

export default async function handler(
  req: Types.Next.NextApiRequest,
  res: Types.Next.NextApiResponse
) {
  usingMiddleware(req, res, async () => {
    const init = await client.init.create({
      data: {},
    })

    res.status(200).json(init)
  })
}

export const config = {
  api: {
    externalResolver: true,
  },
}
