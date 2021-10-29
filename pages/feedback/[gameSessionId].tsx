import {FeedbackPage} from '../../components/feedback/feedback_page'
import {client} from '../../prisma/client'
import {getValidatedToken} from '../api/auth/[...nextauth]'

export const getServerSideProps: Types.Next.GetServerSideProps = async (
  context
) => {
  const jwt = await getValidatedToken(context.req as any)
  const gameSessionId = context?.params?.gameSessionId as string

  // user is not logged in
  if (!jwt?.sub) {
    return {
      redirect: {
        destination: 'api/auth/signin',
        permanent: false,
      },
    }
  }

  const feedback = await client.feedback.findUnique({
    where: {
      userId_gameSessionId: {
        userId: jwt.sub,
        gameSessionId,
      },
    },
  })

  // valid, server side render the feedback page
  return {
    props: {
      initialData: feedback,
    },
  }
}

const Page = (props: any) => {
  return <FeedbackPage initialData={props.initialData} />
}

Page.auth = true
export default Page
