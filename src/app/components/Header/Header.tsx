"use client";

import React from "react";
import { Menu } from "antd";
import { useRouter } from "next/navigation";

import UserAvatar from "./UserAvatar";
const isLoggedIn =
  typeof window !== "undefined" && localStorage.getItem("token");
const items1 = [
  { key: "/", label: "Home" },
  { key: "/about", label: "About" },
  ...(isLoggedIn ? [] : [{ key: "/login", label: "Login" }]),
];

const Header: React.FC = () => {
  const router = useRouter(); // Initialize the router

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key); // Navigate to the clicked route
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#001529", // Ant Design dark theme header background
        padding: "0 16px",
        height: "64px",
      }}
    >
      <div style={{ color: "#fff", fontSize: "18px", fontWeight: "bold" }}>
        Organizations
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["/"]}
        items={items1}
        onClick={handleMenuClick}
        style={{
          flex: 1,
          minWidth: 0,
          justifyContent: "center",
          borderBottom: "none", // Removes default border in the dark theme
        }}
      />
      {isLoggedIn && <UserAvatar />}
    </div>
  );
};

export default Header;
