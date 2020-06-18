import React from "react";
import { Menu } from "antd";

const { SubMenu } = Menu;
const Right = () => {
  return (
    <Menu mode="horizontal">
      <SubMenu title={<span className="submenu-title-wrapper">About</span>}>
        <Menu.ItemGroup title="About">
          <Menu.Item key="setting:1">Disclaimer</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Contact us">
          <Menu.Item key="setting:3">
            <a
              href="https://web.facebook.com/puwanedz"
              target="_blank"
              rel="noopener noreferrer"
            >
              facebook
            </a>
          </Menu.Item>
          <Menu.Item key="setting:4">
            <a
              href="https://github.com/puwaned"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};
export default Right;
