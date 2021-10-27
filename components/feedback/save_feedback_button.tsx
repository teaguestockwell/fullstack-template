import React from 'react'
import {cssVars} from '../../const'
import {feedback} from '../../hooks/use_feedback'

export const SaveFeedbackButton = () => {
  const isValid = feedback.useIsValid()
  const useMutation = feedback.usePutMutation()
  const [isSuccess, setIsSuccess] = React.useState(false)

  React.useEffect(() => {
    setIsSuccess(useMutation.isSuccess)
    setTimeout(() => {
      setIsSuccess(false)
    }, 5000)
  }, [useMutation.isSuccess])

  const cursor = (() => {
    if (!isValid) {
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

  const onClick = () => (cursor === 'pointer' ? useMutation.mutate() : null)

  const css = isValid
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
