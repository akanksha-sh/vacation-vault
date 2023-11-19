import React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./style/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
