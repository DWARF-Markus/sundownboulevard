/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import logo from "./images/beach.svg";
import "./App.scss";
import "./components/layout/NavBar/NavBar.scss";

import Footer from "./components/layout/Footer/Footer";

function App() {
  const [open, setOpen] = useState(false);

  const toggleNav = () => {
    setOpen(!open);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav className="navbar-container white">
            <div className="navbar-wrapper">
              <div className="navbar-logo">
                <img src={logo} alt="Sundown Boulevard logo" />
              </div>
              <div onClick={() => toggleNav()} className="navbar-mobile-menu">
                <div
                  className={
                    open ? "nav-mobile-bars active" : "nav-mobile-bars"
                  }
                >
                  <div className="bar1" />
                  <div className="bar2" />
                  <div className="bar3" />
                </div>
              </div>
              <div className="nav-links">
                <ul>
                  <li className="nav-entry active pt-1">
                    <Link to="/" className="black-text mx-1 red-text" href="#!">
                      BOOK
                    </Link>
                  </li>
                  <li className="nav-entry pt-1">
                    <a className="black-text mx-1" href="#!">
                      NEWSLETTER
                    </a>
                  </li>
                  <li className="nav-entry pt-1">
                    <a className="black-text mx-1" href="#!">
                      PRODUCTS
                    </a>
                  </li>
                  <li className="nav-entry pt-1">
                    <a className="black-text mx-1" href="#!">
                      RESTAURANTS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={
                open
                  ? "nav-mobile-links active white px-1"
                  : "nav-mobile-links white px-1"
              }
            >
              <h1 className="logo-text mt-1">SUNDOWN BOULEVARD</h1>
              <ul>
                <li className="nav-mobile-entry active pt-1">
                  <a className="black-text" href="#!">
                    BOOK
                  </a>
                </li>
                <li className="nav-mobile-entry pt-1">
                  <a className="black-text" href="#!">
                    NEWSLETTER
                  </a>
                </li>
                <li className="nav-mobile-entry pt-1">
                  <a className="black-text" href="#!">
                    PRODUCTS
                  </a>
                </li>
                <li className="nav-mobile-entry pt-1">
                  <a className="black-text" href="#!">
                    RESTAURANTS
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/order">
              <OrderPage />
            </Route>
          </Switch>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
