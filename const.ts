export const domain = 'fullstack-template.vercel.app'

export const title = 'Fullstack Template'

export const description = 'Fullstack Template'

export const maxWidth = '800px'

// https://epicreact.dev/css-variables/
export const cssVars = {
  shadow: {
    WebkitBoxShadow: 'var(--shadow)',
    MozBoxShadow: 'var(--shadow)',
    boxShadow: 'var(--shadow)',
  },
  contentPad: 'var(--content-pad)',
  cardRad: 'var(--card-rad)',
  color: {
    pallet0: 'var(--pallet-0)',
    pallet1: 'var(--pallet-1)',
    border: 'var(--border)',
    hoverBg: 'var(--hovbg)',
    nav: 'var(--nav-bg)',
    bg: {
      '0': 'var(--bgc-0)',
      '1': 'var(--bgc-1)',
      '2': 'var(--bgc-2)',
    },
    font: {
      '0': 'var(--fc-0)',
      '1': 'var(--fc-1)',
    },
  },
  size: {
    font: {
      sm: 'var(--fs-sm)',
      md: 'var(--fs-md)',
      lg: 'var(--fs-lg)',
      xl: 'var(--fs-xl)',
      xxl: 'var(--fs-xxl)',
      xxxl: 'var(--fs-xxxl)',
    },
    mq: {
      sm: '@media (min-width: 576px)',
      md: '@media (min-width: 768px)',
      lg: '@media (min-width: 992px)',
      xl: '@media (min-width: 1200px)',
      xxl: '@media (min-width: 1600px)',
    },
  },
}
