import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const Left = () => {
  const [current, setCurrent] = useState("home");

  const handleRedirect = (e) => {
    setCurrent(e);
  };

  return (
    <Menu
      mode="horizontal"
      onClick={(e) => handleRedirect(e)}
      selectedKeys={[current]}
    >
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
    </Menu>
  );
};
export default Left;
