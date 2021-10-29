import {cssVars} from '../../const'
import {feedback} from '../../hooks/use_feedback'
import {Content} from '../content'
import {FeedbackComment} from './feedback_comment'
import {FeedbackRate} from './feedback_rate'
import {SaveFeedbackButton} from './save_feedback_button'

export const FeedbackPage = ({
  initialData,
}: {
  initialData: Types.Prisma.Feedback | null
}) => {
  feedback.useInit(initialData)

  return (
    <Content
      style={{
        marginTop: 20,
      }}
    >
      <div
        style={{
          borderRadius: cssVars.cardRad,
          border: `1px solid ${cssVars.color.font[1]}`,
        }}
      >
        <div style={{marginLeft: 20, marginRight: 20, marginTop: 10}}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h3
              style={{
                fontSize: cssVars.size.font.md,
                color: cssVars.color.font[1],
                fontWeight: 800,
              }}
            >
              Feedback
            </h3>
            <SaveFeedbackButton />
          </div>

          <FeedbackComment style={{marginTop: 10}} />
        </div>

        <div
          style={{
            color: cssVars.color.font[1],
            borderTop: `1px solid ${cssVars.color.font[1]}`,
            width: '100%',
            display: 'flex',
            marginTop: 10,
          }}
        />

        <FeedbackRate store={feedback.useStore} />
      </div>
    </Content>
  )
}
