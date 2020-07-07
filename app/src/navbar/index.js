import React from "react";
// import LeftMenu from "./left";
import RightMenu from "./right";
import { withRouter } from "react-router-dom";

const Navbar = ({ history }) => {
  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="#" onClick={() => history.push("/")}>
          Zk-voting
        </a>
      </div>
      <div className="menuCon">
        <div className="leftMenu">{/* <LeftMenu /> */}</div>
        <div className="rightMenu">
          <RightMenu />
        </div>
      </div>
    </nav>
  );
};
export default withRouter(Navbar);
