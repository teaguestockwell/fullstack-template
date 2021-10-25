import {Cell} from './cell'
import {useInfiniteFeedbacks, store} from '../../hooks/use_infinite_feedbacks'
import {Content} from '../../components/content'
import {LoadingText} from '../loading_text'
import {EmojiRate} from './emoji_rate'
import {cssVars} from '../../const'
import Lazy from 'react-lazyload'
import {UseFetchMore} from '../../hooks/use_fetch_more'

export const InfiniteFeedback = () => {
  const rating = store((s) => s.rating)
  const q = useInfiniteFeedbacks(rating)

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
            ...cssVars.shadow,
          }}
        >
          <EmojiRate store={store} />
        </div>

        {/* load page data */}
        {q.data.pages.map((page, pageI) => (
          <Lazy key={pageI} unmountIfInvisible offset={300}>
            {page.map((feedback) => (
              <Cell key={feedback.id} feedback={feedback} />
            ))}
          </Lazy>
        ))}

        <UseFetchMore fetchMore={() => q.fetchNextPage()} />

        {q.isFetching && (
          <LoadingText text="Hang on one second. We are loading more." />
        )}

        {!q.hasNextPage && !q.isLoading && (
          <LoadingText text="Congrats! You made it though all the feedback." />
        )}
      </>
    </Content>
  )
}
