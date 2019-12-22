import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { blueGrey, deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: "'Quicksand', sans-serif",
      fontWeight: 'normal',
    },
    h2: {
      fontFamily: "'Maitree', serif",
      fontWeight: 'normal',
    },
    h3: {
      fontFamily: "'Maitree', serif",
      fontWeight: 'normal',
    },
    h4: {
      fontFamily: "'Maitree', serif",
      fontWeight: 'normal',
    },
    h5: {
      fontFamily: "'Maitree', serif",
      fontWeight: 'normal',
    },
    h6: {
      fontFamily: "'Quicksand', sans-serif",
      fontWeight: 'normal',
    },
    subtitle1: {
      fontFamily: "'Maitree', serif",
      fontWeight: 'normal',
    },
    subtitle2: {
      fontFamily: "'Maitree', serif",
      fontWeight: 'normal',
    },
    caption: {
      fontFamily: "'Maitree', serif",
      fontWeight: 'normal',
    },
  },
  palette: {
    primary: deepOrange,
    secondary: blueGrey,
    text: {
      primary: blueGrey['700'],
      secondary: blueGrey['600'],
    },
  },
  overrides: {
    MuiTypography: {
      h1: {
        color: blueGrey['600'],
      },
      h2: {
        color: blueGrey['600'],
      },
      h3: {
        color: blueGrey['600'],
      },
      h4: {
        color: blueGrey['600'],
      },
      h5: {
        color: blueGrey['600'],
      },
    },
  },
});

export default responsiveFontSizes(theme);
