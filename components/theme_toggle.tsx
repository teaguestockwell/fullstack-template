import {useTheme} from 'next-themes'
import Dark from '@material-ui/icons/Brightness4'
import Light from '@material-ui/icons/Brightness7'
import {cssVars} from '../const'

export const ThemeToggle = ({size = 36}: {size?: number}) => {
  const {theme, setTheme} = useTheme()

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const iconProps = {
    width: size,
    style: {
      fontSize: size,
      color: cssVars.color.font[1],
    },
  }

  return (
    <button
      data-testid={`toggle-${theme}`}
      onClick={toggleTheme}
      aria-label="toggle theme"
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        '&:hover': {
          backgroundColor: cssVars.color.hoverBg,
        },
        '&:focus': {
          backgroundColor: cssVars.color.hoverBg,
        },
      }}
    >
      {theme === 'light' ? <Dark {...iconProps} /> : <Light {...iconProps} />}
    </button>
  )
}
