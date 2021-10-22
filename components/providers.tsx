import {ThemeProvider} from 'next-themes'

export const Providers = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return <ThemeProvider>{children}</ThemeProvider>
}
