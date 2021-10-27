import * as yup from 'yup'
import {usingMethods} from '../../../../middleware/using_methods'
import {usingMiddleware} from '../../../../middleware/using_middleware'
import {client} from '../../../../prisma/client'

// ?userId=${userId}&gameSessionId=${gameSessionId}&rating=${rating}&createdAtGTE=${createdAtGTE}&createdAtLTE=${createdAtLTE}&updatedAtGTE=${updatedAtGTE}&updatedAtLTE=${updatedAtLTE}&pageSize=${pageSize}&cursor=${cursor}
const querySchema = yup.object().shape({
  userId: yup.string().max(36),
  gameSessionId: yup.string().max(36),
  createdAtGTE: yup.date().max(36),
  updatedAtGTE: yup.date().max(36),
  createdAtLTE: yup.date().max(36),
  updatedAtLTE: yup.date().max(36),
  rating: yup.number().min(0).max(4),
  cursor: yup.string().max(36),
  pageSize: yup.number().min(25).max(1000),
})

const Route = async (
  req: Types.Next.NextApiRequest,
  res: Types.Next.NextApiResponse
) =>
  usingMiddleware(req, res, async () => {
    await usingMethods(req, ['GET'])

    const params = req.query as any

    try {
      await querySchema.validate(params)
    } catch (e) {
      res.status(400).json({msg: `${e}`})
      return
    }

    const filters = [] as any

    if (params.userId) {
      filters.push({
        userId: {
          equals: params.userId,
        },
      })
    }

    if (params.gameSessionId) {
      filters.push({
        gameSessionId: {
          equals: params.gameSessionId,
        },
      })
    }

    if (params.createdAtGTE) {
      filters.push({
        createdAt: {
          gte: new Date(params.createdAt),
        },
      })
    }

    if (params.updatedAtGTE) {
      filters.push({
        createdAt: {
          gte: new Date(params.createdAt),
        },
      })
    }

    if (params.createdAtLTE) {
      filters.push({
        createdAt: {
          lte: new Date(params.createdAt),
        },
      })
    }

    if (params.updatedAtLTE) {
      filters.push({
        createdAt: {
          lte: new Date(params.updatedAt),
        },
      })
    }

    if (params.rating) {
      filters.push({
        rating: {
          equals: Number(params.rating),
        },
      })
    }

    const cursorProps = {
      take: Number(params.pageSize ?? 25),
    } as any

    // no cursor on first query
    if (params.cursor) {
      cursorProps.skip = 1 // skip the cursor
      cursorProps.cursor = {
        id: params.cursor,
      }
    }

    const feedbacks = await client.feedback.findMany({
      where: {
        AND: filters,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...cursorProps,
      select: {
        id: true,
        userId: true,
        gameSessionId: true,
        createdAt: true,
        updatedAt: true,
        rating: true,
        comment: true,
        user: {
          select: {
            oauthImgSrc: true,
            oauthName: true,
          },
        },
      },
    })

    res.status(200).json(feedbacks)
  })

export default Route
