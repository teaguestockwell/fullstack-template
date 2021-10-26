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

const store = create(combine(initState, (set) => ({set})))

const useIsValid = () =>
  store((s) => s.comment.length && s.rating !== undefined)

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
      store.setState({
        comment: initialData.comment,
        rating: initialData.rating,
        gameSessionId: initialData.gameSessionId,
        feedbackId: initialData.id,
      })
    } else {
      store.setState({
        gameSessionId,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSessionId])
}

const putFeedback = async () => {
  const state = store.getState()
  const {data} = await axios.put(
    `/api/v1/feedback/${state.gameSessionId}`,
    state
  )
  return data as Types.Prisma.Feedback
}

const useFeedbackMutation = () => {
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

export const useFeedback = {
  store,
  useInit,
  useIsValid,
  useFeedbackMutation,
}
