import React from 'react'
import {cssVars} from '../../const'
import {useFeedback} from '../../hooks/use_feedback'

export const Save = () => {
  const canSave = useFeedback.useIsValid()
  const useMutation = useFeedback.useFeedbackMutation()
  const [isSuccess, setIsSuccess] = React.useState(false)

  React.useEffect(() => {
    if (useMutation.isSuccess) {
      setIsSuccess(true)

      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } else {
      setIsSuccess(false)
    }
  }, [useMutation.isSuccess])

  const onClick = () => {
    if (!canSave) return

    if (useMutation.isLoading) return

    useMutation.mutate()
  }

  const cursor = (() => {
    if (!canSave) {
      return 'not-allowed'
    }

    if (useMutation.isLoading) {
      return 'wait'
    }

    return 'pointer'
  })()

  const text = (() => {
    if (isSuccess) {
      return 'Saved'
    }

    if (useMutation.isLoading) return 'Saving...'

    return 'Save'
  })()

  const css = canSave
    ? {
        '&:hover, &:focus': {
          backgroundColor: cssVars.color.bg[0],
          color: cssVars.color.font[0],
        },
      }
    : {}

  return (
    <button
      onClick={onClick}
      css={{
        cursor,
        width: 100,
        textAlign: 'center',
        border: `1px solid ${cssVars.color.font[0]}`,
        color: cssVars.color.bg[0],
        backgroundColor: cssVars.color.font[0],
        borderRadius: 10,
        fontWeight: 800,
        fontSize: cssVars.size.font.md,
        ...css,
      }}
    >
      {text}
    </button>
  )
}
