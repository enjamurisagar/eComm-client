import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//pages
import Home from "./pages/home";
import Auth from "./pages/loginRegister";

//components
import Navbar from "./components/navbar";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Helper from "./helpers";
import Admin from "./pages/admin/admin";
import SingleProduct from "./components/SingleProduct";
import Store from "./pages/store";
import Cart from "./pages/cart";
import Me from "./pages/me";
import Payment from "./pages/Payment";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const { token } = Helper();
  const isAuth = Boolean(token);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/auth"
            exact
            element={!isAuth ? <Auth /> : <Navigate to="/" />}
          />
          <Route path="/store" exact element={<Store />} />

          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/me"
            element={!isAuth ? <center>Please login/register</center> : <Me />}
          />
          <Route
            path="/payment"
            element={isAuth ? <Payment /> : <Navigate to="/" />}
          />
          <Route path="/admin" exact element={<Admin />} />
          <Route
            path="*"
            exact
            element={
              <center>
                <h1>404 NOT FOUND</h1>
              </center>
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
