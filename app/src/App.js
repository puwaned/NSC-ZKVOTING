import React, { lazy } from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar";

//component
const Home = lazy(() => import("./view/Home"));
const Vote = lazy(() => import("./view/Vote"));

//App.js
const App = () => {
  const loading = () => (
    <div className="animated fadeIn pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
  return (
    <HashRouter>
      <Navbar />
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route
            path="/"
            name="Home"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/vote/:reference"
            name="Vote"
            render={(props) => <Vote {...props} />}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
