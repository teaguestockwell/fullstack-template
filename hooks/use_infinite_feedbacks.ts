import queryString from 'query-string'
import axios from 'axios'
import create from 'zustand'
import {useInfiniteQuery} from 'react-query'
import {combine} from 'zustand/middleware'

export const store = create(
  combine(
    {
      rating: undefined,
    },
    (set) => ({set})
  )
)

export const getFeedback = async (cursor: string) => {
  const {rating} = store.getState()

  let query = queryString.stringify({
    cursor,
    rating,
  })

  query = query ? `?${query}` : ''

  const res = await axios.get(`/api/v1/feedback${query}`)

  return res.data as Types.Feedback.WithUser[]
}

export const useInfiniteFeedbacks = (rating?: number) => {
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
