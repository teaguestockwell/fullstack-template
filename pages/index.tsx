import Link from 'next/link'
import {Content} from '../components/content'
import {cssVars} from '../const'

const Page = () => {
  const buttonCss = {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: 200,
    height: 50,
    textAlign: 'center',
    border: '1px solid ' + cssVars.color.font[0],
    '&:hover, & focus': {
      opacity: 0.8,
      backgroundColor: cssVars.color.hoverBg,
    },
  } as any

  return (
    <Content
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
    >
      <Link href="/feedback" passHref>
        <button css={buttonCss}>View Feedback</button>
      </Link>

      <Link href="/feedback/1" passHref>
        <button css={buttonCss}>Create or Update Your feedback</button>
      </Link>
    </Content>
  )
}

export default Page
