import {useMutation} from 'react-query'
import axios from 'axios'
import create from 'zustand'
import {combine} from 'zustand/middleware'
import React from 'react'
import {useRouter} from 'next/dist/client/router'

interface State {
  comment: string
  rating?: number
  gameSessionId?: string
  feedbackId?: string
}

const initState: State = {
  comment: '',
  rating: undefined,
  gameSessionId: undefined,
  feedbackId: undefined,
}

const useStore = create(combine(initState, (set) => ({set})))

const isValid = (s: State) => s.comment.length > 0 && s.rating !== undefined

const useIsValid = () => useStore(isValid)

/**
 * @param state the initial state of the store
 * when the feedback component is rendered on the client,
 * if the user has submitted feedback for this session,
 * set the initial state of the store
 */
const useInit = ({
  initialData,
}: {
  initialData: Types.Prisma.Feedback | null
}) => {
  // grab this from the context of the url
  const {gameSessionId} = useRouter().query as any

  return React.useEffect(() => {
    if (initialData) {
      useStore.setState({
        comment: initialData.comment,
        rating: initialData.rating,
        gameSessionId: initialData.gameSessionId,
        feedbackId: initialData.id,
      })
    } else {
      useStore.setState({
        ...initState,
        gameSessionId,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSessionId])
}

const putFeedback = async () => {
  const s = useStore.getState()

  const {data} = await axios({
    method: 'put',
    url: `/api/feedback/${s.feedbackId}`,
    data: s,
  })

  return data as Types.Prisma.Feedback
}

const usePutMutation = () => {
  const router = useRouter()

  return useMutation(putFeedback, {
    onSuccess: () => {
      const {feedbackId, gameSessionId} = router.query as any
      // there is no feedback id because the user created a new feedback,
      if (!feedbackId) {
        router.replace(`/feedback/${gameSessionId}/edit`, undefined, {
          shallow: true,
        })
      }
    },
    retry: 3,
  })
}

export const feedback = {
  useStore,
  useInit,
  useIsValid,
  usePutMutation,
}
