import axios from 'axios'
import {useRouter} from 'next/dist/client/router'
import React from 'react'
import {useMutation} from 'react-query'
import create from 'zustand'
import {combine, devtools} from 'zustand/middleware'

const useStore = create(
  devtools(
    combine(
      {
        comment: '',
        rating: undefined as number | undefined,
      },
      (set) => ({set})
    )
  )
)

const useIsValid = () =>
  useStore((s) => {
    return s.comment.length > 0 && s.rating !== undefined
  })

// initialize the store from the server side render props
const useInit = (initialData: Types.Prisma.Feedback | null) => {
  return React.useEffect(() => {
    useStore.setState({
      comment: initialData?.comment ?? '',
      rating: initialData?.rating,
    })
  }, [initialData])
}

const putFeedback = async (gameSessionId: string) => {
  const {data} = await axios({
    method: 'put',
    url: `/api/v1/feedback/${gameSessionId}`,
    data: useStore.getState(),
  })

  return data as Types.Prisma.Feedback
}

const usePutMutation = () => {
  const {gameSessionId} = useRouter().query as any

  return useMutation({
    mutationFn: async () => putFeedback(gameSessionId),
    retry: 3,
  })
}

export const feedback = {
  useStore,
  useInit,
  useIsValid,
  usePutMutation,
}
