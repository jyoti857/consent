import {AppProps} from 'next/app'
import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp({ Component, pageProps }: AppProps) {
  return<ThemeProvider theme = {theme}>
    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp
