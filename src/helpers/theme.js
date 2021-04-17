import { createMuiTheme } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: grey[300],
    },
    background: {
      default: '#FAFBFE',
    },
    text: {
      primary: '#000',
    },
  },
})

export default theme;
