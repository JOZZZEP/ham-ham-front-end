import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";
import "./index.css";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    allVariants: {
      fontFamily: "Itim",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <AuthContextProvider>
        <CssBaseline />
        <App />
      </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
