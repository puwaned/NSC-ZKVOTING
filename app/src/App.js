import React, { lazy, useEffect } from "react";
import firebase from "firebase/app";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar";

//component
const Home = lazy(() => import("./view/Home"));
const Vote = lazy(() => import("./view/Vote"));

//App.js
const App = () => {
  useEffect(() => {
    const config = {
      apiKey: "AIzaSyD4hY56pEG1WbZbFRaGCxEPP_x6qUIQzlU",
      authDomain: "nsc-zk.firebaseapp.com",
      databaseURL: "https://nsc-zk.firebaseio.com",
      projectId: "nsc-zk",
      storageBucket: "nsc-zk.appspot.com",
      messagingSenderId: "625559295424",
    };
    firebase.initializeApp(config);
  }, []);
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
            render={(props) => <Vote {...props} firebase={firebase} />}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
