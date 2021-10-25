import React from 'react'
import {useFeedback} from '../../hooks/use_feedback'

export const Comment = ({style = {}}: {style?: React.CSSProperties}) => {
  const value = useFeedback.store((s) => s.comment)

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
      onChange={(e) => useFeedback.store.setState({comment: e.target.value})}
    />
  )
}
