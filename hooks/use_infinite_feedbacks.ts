import queryString from 'query-string'
import axios from 'axios'
import create from 'zustand'
import {useInfiniteQuery} from 'react-query'
import {combine} from 'zustand/middleware'

const useStore = create(
  combine(
    {
      rating: undefined,
    },
    (set) => ({set})
  )
)

const getFeedback = async (cursor: string) => {
  const {rating} = useStore.getState()

  const params = queryString.stringify({
    cursor,
    rating,
  })

  const {data} = await axios({
    method: 'get',
    url: `/api/v1/feedback${params ? '?' : ''}${params}`,
  })

  return data as Types.Feedback.WithUser[]
}

const useInfiniteFeedbacks = (rating?: number) => {
  return useInfiniteQuery(
    ['infinite-feedbacks', `rating-${rating}`],
    ({pageParam = undefined}) => getFeedback(pageParam),
    {
      getNextPageParam: (lastPage: any) => {
        return lastPage[lastPage.length - 1]?.id
      },
    }
  )
}

export const infiniteFeedback = {
  useInfiniteFeedbacks,
  useStore,
}
