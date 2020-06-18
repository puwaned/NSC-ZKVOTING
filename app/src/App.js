import React from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar";

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
          {/* <Route
        path="/"
        name="Login"
        render={(props) => <Login {...props} />}
      /> */}
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
