/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

import { Provider } from "react-redux";
import store from "./store";

import HomePage from "./pages/HomePage";
import BookingsPage from "./pages/BookingsPage";
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
              <Link to="/">
                <div className="navbar-logo">
                  <img src={logo} alt="Sundown Boulevard logo" />
                  <p className="logo-text">SUNDOWN BOULEVARD - REACT</p>
                </div>
              </Link>
              <div onClick={() => toggleNav()} className="navbar-mobile-menu">
                <div
                  className={
                    open ? "nav-mobile-bars nav-active" : "nav-mobile-bars"
                  }
                >
                  <div className="bar1" />
                  <div className="bar2" />
                  <div className="bar3" />
                </div>
              </div>
              <div className="nav-links">
                <ul>
                  <li className="nav-entry nav-active pt-1">
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
                  ? "nav-mobile-links nav-active white px-1"
                  : "nav-mobile-links white px-1"
              }
            >
              <h1 className="logo-text mt-1">SUNDOWN BOULEVARD</h1>
              <ul>
                <li className="nav-mobile-entry nav-active pt-1">
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

          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 1 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Route exact path="/">
              <HomePage />
              <Footer />
            </Route>
            <Route exact path="/bookings">
              <BookingsPage />
              <Footer />
            </Route>
            <Route path="/order">
              <OrderPage />
              <Footer />
            </Route>
          </AnimatedSwitch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
