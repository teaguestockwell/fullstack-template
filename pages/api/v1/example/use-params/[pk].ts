import {usingMiddleware} from '../../../../../middleware/using_middleware'

export default async function handler(
  req: Types.Next.NextApiRequest,
  res: Types.Next.NextApiResponse
) {
  usingMiddleware(req, res, async () => {
    const pk = req.query.pk as string

    res.status(200).json({pk})
  })
}
