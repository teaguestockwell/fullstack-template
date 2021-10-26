import Link from 'next/link'
import {Content} from '../components/content'

const Page = () => {
  return (
    <Content
      style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}
    >
      <Link href="/feedback">View Feedback</Link>
      <Link href="/feedback/1/new">Create and update feedback</Link>
    </Content>
  )
}

export default Page
