import {useServerTimeQuery} from '../hooks/use_post_query'

export const ViewPost = ({initPost}: {initPost: Types.MockPost.ReadDeep}) => {
  const q = useServerTimeQuery({initPost})

  if (!q.data) return <p>Loading post</p>

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {q.isFetching && <p>...</p>}
      <p>id: {q.data.id}</p>
      <p>title: {q.data.title}</p>
      <p>body: {q.data.body}</p>
    </div>
  )
}
