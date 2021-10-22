import {useQuery} from 'react-query'
import {getPath} from '../utils'
import axios from 'axios'

const getPost = async ({
  postId,
}: {
  postId: string
}): Promise<Types.MockPost.ReadDeep> => {
  const res = (await axios.get(getPath.mockPost.ep({postId}))) as any
  return res.data
}

export const useServerTimeQuery = ({
  initPost,
}: {
  initPost: Types.MockPost.ReadDeep
}) => {
  return useQuery({
    queryKey: ['post', initPost.id],
    queryFn: async () => getPost({postId: initPost.id}),
    initialData: initPost,
  })
}
