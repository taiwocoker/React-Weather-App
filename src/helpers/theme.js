import { createMuiTheme } from '@material-ui/core/styles'

const purple = '#701d65'
const lilac = '#FFF0FE'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple,
    },
    secondary: {
      main: lilac,
    },
    background: {
      default: '#FAFBFE',
    },
    text: {
      primary: '#000',
    },
  },
})

export default theme
