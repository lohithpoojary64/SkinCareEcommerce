"use client";
import React, { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link"; 

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout>
      <Header className="flex justify-between items-center bg-blue-600 px-6">
        <div className="text-white text-lg font-bold">
          <Link href="/">CureSkin</Link>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          className="hidden md:flex bg-transparent"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1">
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/contact">Contact</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/login">Login</Link>
          </Menu.Item>
        </Menu>

        <Button
          className="md:hidden text-white"
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
        />

        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setVisible(false)}
          open={visible}
        >
          <Menu mode="vertical">
            <Menu.Item key="1">
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="/contact">Contact</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link href="/login">Login</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default Navbar;
