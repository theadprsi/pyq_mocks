import React, { Component, Fragment } from "react";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

// Global State

import { UpdatedQuizContextProvider } from "./GlobalState";

//

// Micro Component

import {
  AppOverlay,
  show_hideAppBar,
  Toast,
} from "./MicroComponent/MicroComponent";

// Side View

import AppDrawer from "./AppDrawer/AppDrawer";
// import AppProfile from "./AppProfile/AppProfile";

// Main View

import Home from "./pages/Home/Home";
import Syllabus from "./pages/Syllabus/Syllabus";
import About from "./pages/About/About";

import TestMock from "./pages/Quiz/Quiz";
import Collection from "./pages/Collection/Collection";

import NotFound from "./pages/NotFound/NotFound";
import AppBar from "./AppBar/AppBar";
import { Logo } from "./assets/assets";

class App extends Component {
  componentDidMount = () => {
    this.splashScreenRemove();
  };

  // Splash Screen Remove

  splashScreenRemove = () => {
    setTimeout(() => {
      document.getElementById("splash-screen").remove();
    }, 1000);
  };

  render() {
    return (
      <>
        <div id="splash-screen">
          <img src={Logo} alt="Logo" />
        </div>

        <BrowserRouter>
          <UpdatedQuizContextProvider>
            <Switch>
              <Route path="/ssc/:group/:year/:qid" component={TestMock} exact />
              <Route
                path="/railway/:group/:year/:qid"
                component={TestMock}
                exact
              />

              <Fragment>
                <div className="App">
                  <AppDrawer />

                  <main>
                    <AppBar />

                    <Switch>
                      <Route path="/" component={Home} exact />
                      <Route path="/syllabus" component={Syllabus} exact />
                      <Route path="/about" component={About} exact />

                      <Route path="/ssc/:group" component={Collection} exact />
                      <Route
                        path="/railway/:group"
                        component={Collection}
                        exact
                      />

                      <Route component={NotFound} />
                    </Switch>

                    <Toast />
                    <AppOverlay />
                  </main>

                  {/* <AppProfile /> */}
                  <div onClick={show_hideAppBar} id="app-drawer-overlay"></div>
                </div>
              </Fragment>
            </Switch>
          </UpdatedQuizContextProvider>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
