import {NextSeo} from 'next-seo'
import {ViewPost} from '../../components/example/view_post'
import {domain} from '../../const'
import {getAllPostIds, getPost} from '../../services/mock_post'
import {getPath} from '../../utils'

export const getParam = (postId: string) => {
  return {
    params: {
      postId,
    },
  }
}

export const getPaths = (postIds: string[]) => {
  return postIds.map((id) => getParam(id))
}

export async function getStaticPaths() {
  const postIds = await getAllPostIds({limit: 1000})

  return {
    paths: getPaths(postIds),
    fallback: 'blocking',
  }
}

export const getStaticProps: Types.Next.GetStaticProps = async (context) => {
  const {params} = context
  const {postId} = params as any

  if (!postId || typeof postId !== 'string') {
    return {
      notFound: true,
    }
  }

  const [post] = await Promise.all([getPost(postId)])

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    revalidate: 60,
    props: {
      post,
    },
  }
}

const Page = ({post}: {post: Types.MockPost.ReadDeep}) => {
  const description = post.body
  return (
    <>
      <NextSeo
        canonical={
          `https://${domain}` + getPath.mockPost.view({postId: post.id})
        }
        title={post.title}
        description={description}
        openGraph={{
          title: post.title,
          url: `https://${domain}` + getPath.mockPost.view({postId: post.id}),
          description,
          // images: [
          //   {
          //     url:
          //       Util.getSrcOfS3Key(userProfile.profilePicS3Key) ??
          //       (userProfile.profileSrc as string),
          //     // width: 800,
          //     // height: 800,
          //     alt: userProfile.name,
          //     type: 'image/jpeg',
          //   },
          // ],
        }}
      />
      <ViewPost initPost={post} />
    </>
  )
}

export default Page
