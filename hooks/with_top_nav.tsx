import {TopNav} from '../components/nav/top_nav'

export const WithTopNav = ({
  children,
  hasNav = true,
}: {
  children?: any
  hasNav?: boolean
}) => {
  return (
    <>
      {hasNav && <TopNav />}

      <main style={{paddingTop: hasNav ? 58 : 0}}>{children}</main>
    </>
  )
}
