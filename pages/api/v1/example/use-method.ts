import {usingMiddleware} from '../../../../middleware/using_middleware'
import {usingMethods} from '../../../../middleware/using_methods'

export default async function handler(
  req: Types.Next.NextApiRequest,
  res: Types.Next.NextApiResponse
) {
  usingMiddleware(req, res, async () => {
    const method = await usingMethods(req, ['GET'])

    res.status(200).json({method})
  })
}

export const config = {
  api: {
    externalResolver: true,
  },
}
