import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { deepOrange, lightBlue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: lightBlue,
  },
});

export default responsiveFontSizes(theme);
