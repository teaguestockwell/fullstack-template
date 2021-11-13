import axios from 'axios'
import {useInfiniteQuery} from 'react-query'
import create from 'zustand'
import {combine} from 'zustand/middleware'
import {useShowScrollbar} from './use_show_scrollbar'

const getFeedback = async (cursor: string, qs: string) => {
  const params = new URLSearchParams(qs)
  if (cursor) params.set('cursor', cursor)

  const q = params.toString()

  const {data} = await axios({
    method: 'get',
    url: `/api/v1/feedback${q ? '?' + q : ''}`,
  })

  return data as Types.Feedback.WithUser[]
}

const useInfiniteFeedbacks = (qs: string) => {
  return useInfiniteQuery(
    ['infinite-feedbacks', qs],
    ({pageParam: cursor = ''}) => getFeedback(cursor, qs),
    {
      getNextPageParam: (lastPage: any) => {
        return lastPage[lastPage.length - 1]?.id
      },
    }
  )
}

export const useFilteredInfiniteFeedbackQueryParams = create(
  combine(
    {
      rating: undefined,
    },
    (set) => ({set})
  )
)

const useQueryString = () => {
  const state = useFilteredInfiniteFeedbackQueryParams()

  const params = new URLSearchParams()
  if (state.rating) params.set('rating', state.rating)

  return params.toString()
}

export const useFilteredInfiniteFeedbacksQuery = () => {
  useShowScrollbar()
  const queryString = useQueryString()
  return useInfiniteFeedbacks(queryString)
}
