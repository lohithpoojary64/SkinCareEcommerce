"use client";
import React, { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header } = Layout;

const menuItems = [
  { key: "1", label: <Link href="/">Home</Link> },
  { key: "2", label: <Link href="/products">Products</Link> },
  { key: "3", label: <Link href="/cart">Cart</Link> },
  { key: "4", label: <Link href="/login">Login</Link> },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout>
      <Header className="flex justify-between items-center bg-blue-600 px-6">
        <div className="text-white text-lg font-bold">
          <Link href="/">NextGenStore</Link>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          className="hidden md:flex bg-transparent"
          defaultSelectedKeys={["1"]}
          items={menuItems} // ✅ Fixed: Using items prop
        />

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
          <Menu mode="vertical" items={menuItems} /> 
        </Drawer>
      </Header>
    </Layout>
  );
};

export default Navbar;
