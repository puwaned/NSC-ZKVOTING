import React from "react";
import LeftMenu from "./left";
import RightMenu from "./right";

const Navbar = () => {
  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="/">Zk-voting</a>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu />
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
