import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { blueGrey, deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: blueGrey,
  },
});

export default responsiveFontSizes(theme);
