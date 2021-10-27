import React from 'react'
import {feedback} from '../../hooks/use_feedback'

export const FeedbackComment = ({
  style = {},
}: {
  style?: React.CSSProperties
}) => {
  const value = feedback.useStore((s) => s.comment)

  return (
    <textarea
      style={{
        minWidth: '100%',
        height: 250,
        resize: 'none',
        backgroundColor: 'transparent',
        borderRadius: 10,
        padding: 10,
        ...style,
      }}
      value={value}
      onChange={(e) => feedback.useStore.setState({comment: e.target.value})}
    />
  )
}
