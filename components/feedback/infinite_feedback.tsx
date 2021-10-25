import React from 'react'
import {Cell} from './cell'
import {useInfiniteFeedbacks, store} from '../../hooks/use_infinite_feedbacks'
import {Content} from '../../components/content'
import {useBottomScroll} from '../../hooks/use_bottom_scroll'
import {LoadingText} from '../loading_text'
import {EmojiRate} from './emoji_rate'
import {cssVars} from '../../const'

export const InfiniteFeedback = () => {
  //const queryClient = useQueryClient()
  const rating = store((s) => s.rating)
  const q = useInfiniteFeedbacks(rating)
  useBottomScroll(() => {
    q.fetchNextPage()
  }, 200)

  if (!q.data) {
    return (
      <LoadingText text="Hang on one second. We are loading the feedback" />
    )
  }

  if (q.status === 'error') {
    ;<LoadingText text="Uhh, oh. Looks like we ran into an error. Please refresh the page." />
  }

  return (
    <Content style={{paddingBottom: 100, paddingLeft: 10, paddingRight: 10}}>
      <>
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: cssVars.color.nav,
          }}
        >
          <EmojiRate store={store} />
        </div>

        {/* load page data */}
        {q.data.pages.map((page, pageI) => (
          <React.Fragment key={pageI}>
            {page.map((feedback) => (
              <Cell key={feedback.id} feedback={feedback} />
            ))}
          </React.Fragment>
        ))}

        {q.isLoading && (
          <LoadingText text="Hang on one second. We are loading more." />
        )}

        {!q.hasNextPage && !q.isLoading && (
          <LoadingText text="Congrats! You made it though all the feedback." />
        )}
      </>
    </Content>
  )
}
