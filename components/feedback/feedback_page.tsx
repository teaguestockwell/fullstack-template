import {cssVars} from '../../const'
import {useFeedback} from '../../hooks/use_feedback'
import {Content} from '../content'
import {Comment} from './comment'
import {EmojiRate} from './emoji_rate'
import {Save} from './save'

export const FeedbackPage = ({
  initialData,
}: {
  initialData: Types.Prisma.Feedback | null
}) => {
  useFeedback.useInit({initialData})

  return (
    <Content style={{marginTop: 20}}>
      <div
        css={{
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
            <Save />
          </div>

          <Comment style={{marginTop: 10}} />
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

        <EmojiRate />
      </div>
    </Content>
  )
}
