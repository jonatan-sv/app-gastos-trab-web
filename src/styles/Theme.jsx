import { createTheme } from "@mui/material/styles";
import "./Style.css";

const theme = createTheme({
  typography: {
    fontFamily: 'Archivo, sans-serif',
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#9CEE69",
    },
    secondary: {
      main: "#EE6969",
    },
    background: {
      default: "#191919", 
      paper: "black",
    },
  },
});

export default theme;
