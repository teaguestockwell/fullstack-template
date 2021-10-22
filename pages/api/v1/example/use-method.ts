import {usingMiddleware} from '../../../../middleware/using_middleware'
import {usingMethod} from '../../../../middleware/using_method'

export default async function handler(
  req: Types.Next.NextApiRequest,
  res: Types.Next.NextApiResponse
) {
  usingMiddleware(req, res, async () => {
    const method = await usingMethod(req, ['GET'])

    res.status(200).json({method})
  })
}
