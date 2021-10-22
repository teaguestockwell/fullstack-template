import {usingMiddleware} from '../../../../../middleware/using_middleware'
import {usingMethods} from '../../../../../middleware/using_methods'
import {getPost} from '../../../../../services/mock_post'

export default async function handler(
  req: Types.Next.NextApiRequest,
  res: Types.Next.NextApiResponse
) {
  usingMiddleware(req, res, async () => {
    await usingMethods(req, ['GET'])

    const postId = req.query.postId as string

    const post = await getPost(postId)

    res.status(200).json(post)
  })
}

export const config = {
  api: {
    externalResolver: true,
  },
}
