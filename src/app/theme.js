import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { blueGrey, deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: deepOrange,
  },
});

export default responsiveFontSizes(theme);
