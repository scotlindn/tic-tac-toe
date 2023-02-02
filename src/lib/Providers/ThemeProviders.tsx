import {
  createTheme,
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles'
import { Roboto, Baskervville, Raleway } from '@next/font/google'

export const baskerville = Baskervville({
  weight: '400'
})

export const raleway = Raleway({
  weight: ['400']
})

export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
  fallback: ['Helvetica', 'Arial', 'sans-serif']
})

export const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontWeightBold: 900,
    fontWeightLight: 100,
    fontWeightMedium: 700,
    fontWeightRegular: 400
  }
})

export const ThemeProvider = ({ children }: { children: any }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
