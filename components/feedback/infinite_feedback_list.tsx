import Lazy from 'react-lazyload'
import {cssVars} from '../../const'
import {
  useFilteredInfiniteFeedbackQueryParams,
  useFilteredInfiniteFeedbacksQuery,
} from '../../hooks/use_infinite_feedbacks'
import {UseInViewport} from '../../hooks/use_in_viewport'
import {Content} from '../content'
import {LoadingText} from '../loading_text'
import {FeedbackRate} from './feedback_rate'
import {InfiniteFeedbackItem} from './infinite_feedback_item'

const ContentList = () => {
  const q = useFilteredInfiniteFeedbacksQuery()

  if (!q.data) {
    return (
      <LoadingText text="Hang on one second. We are loading the feedback" />
    )
  }

  if (q.status === 'error') {
    return (
      <LoadingText text="Uhh, oh. Looks like we ran into an error. Please refresh the page." />
    )
  }

  return (
    <Content style={{paddingBottom: 100, paddingLeft: 10, paddingRight: 10}}>
      {q.data.pages.map((page) =>
        page.map((feedback) => {
          return (
            <Lazy key={feedback.id} unmountIfInvisible offset={1000}>
              <InfiniteFeedbackItem feedback={feedback} />
            </Lazy>
          )
        })
      )}

      <UseInViewport cb={(inView) => (inView ? q.fetchNextPage() : null)} />

      {q.isFetching && (
        <LoadingText text="Hang on one second. We are loading more." />
      )}

      {!q.hasNextPage && !q.isLoading && (
        <LoadingText text="Congrats! You made it through all the feedback." />
      )}
    </Content>
  )
}

export const InfiniteFeedbackList = () => {
  return (
    <>
      <ContentList />
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
        <FeedbackRate store={useFilteredInfiniteFeedbackQueryParams} />
      </div>
    </>
  )
}
