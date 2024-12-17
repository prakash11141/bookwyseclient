"use client";

import React from "react";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";

const UserAvatar: React.FC = () => {
  const router = useRouter();

  // Logout logic
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage data
    router.push("/"); // Redirect to the home page
  };

  // Dropdown menu items
  const avatarMenu: MenuProps = {
    items: [
      {
        key: "1",
        label: "Logout",
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Dropdown menu={avatarMenu} placement="bottomRight" trigger={["click"]}>
      <Avatar
        style={{
          backgroundColor: "#87d068",
          cursor: "pointer",
        }}
        icon={<UserOutlined />}
      />
    </Dropdown>
  );
};

export default UserAvatar;
