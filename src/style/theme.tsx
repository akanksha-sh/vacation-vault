import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#131315",
      light: "#1D1D20",
      // can also add light, dark, contrastText
    },
    secondary: {
      main: "#D76A03",
    },
    background: {
      // paper: "#eae0d5",
    },
    success: {
      main: "#13300D",
    },
    error: {
      main: "#F57E00",

      dark: "#983628",
    },

    // green: #13300D
    // ochre: #FFDA85
    // light: #FFF5D6
  },
  // You can also customize other parts of the theme, such as typography, breakpoints, etc.
});

export default theme;
