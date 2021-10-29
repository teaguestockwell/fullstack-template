import axios from 'axios'
import queryString from 'query-string'
import {useInfiniteQuery} from 'react-query'
import create from 'zustand'
import {combine} from 'zustand/middleware'
import {useShowScrollbar} from './use_show_scrollbar'

const getFeedback = async (cursor: string, qs: string) => {
  const {data} = await axios({
    method: 'get',
    url: `/api/v1/feedback?${qs}&cursor=${cursor}`,
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

  const params = queryString.stringify(state)

  return params
}

export const useFilteredInfiniteFeedbacksQuery = () => {
  useShowScrollbar()
  const queryString = useQueryString()
  return useInfiniteFeedbacks(queryString)
}
