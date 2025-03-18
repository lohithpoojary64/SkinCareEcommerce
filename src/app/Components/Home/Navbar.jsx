"use client";
import React, { useState, useEffect } from "react";
import { Layout, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      <Header className="flex justify-between items-center bg-blue-600 px-1 lg:px-6">
        {/* Logo */}
        <div className="text-white text-sm lg:text-lg md:text-lg font-bold">
          <Link href="/" >NextGenStore</Link>
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        {!isMobile && (
          <div className="flex space-x-6 text-white">
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-gray-300 transition">
              Products
            </Link>
            <Link href="/cart" className="hover:text-gray-300 transition">
              Cart
            </Link>
            <Link href="/login" className="hover:text-gray-300 transition">
              Login
            </Link>
          </div>
        )}

        {/* Mobile Menu Button - Visible only on Mobile */}
        {isMobile && (
          <Button
            className="text-white"
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
          />
        )}
      </Header>

      {/* Mobile Drawer Menu - Visible only on Mobile */}
      {isMobile && (
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setVisible(false)}
          open={visible}
        >
          <div className="flex flex-col space-y-4">
            <Link href="/" onClick={() => setVisible(false)}>
              Home
            </Link>
            <Link href="/products" onClick={() => setVisible(false)}>
              Products
            </Link>
            <Link href="/cart" onClick={() => setVisible(false)}>
              Cart
            </Link>
            <Link href="/login" onClick={() => setVisible(false)}>
              Login
            </Link>
          </div>
        </Drawer>
      )}
    </Layout>
  );
};

export default Navbar;
