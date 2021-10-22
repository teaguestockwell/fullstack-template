import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {getPath} from '../../utils'

const endPoints = [
  rest.get(getPath.mockPost.ep({postId: ''}) + ':postId', (req, res, ctx) => {
    const id = req.params.postId as string

    const post: Types.MockPost.ReadDeep = {
      id,
      title: `Post ${id} title`,
      body: `Post ${id} body`,
    }

    const stringyPost = JSON.stringify(post)

    return res(ctx.status(200), ctx.body(stringyPost))
  }),

  rest.get('/api/health', (req, res, ctx) => {
    return res(ctx.status(200), ctx.body(JSON.stringify({status: 'ok'})))
  }),
]

export const server = setupServer(...endPoints)
