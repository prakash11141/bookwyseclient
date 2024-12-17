"use client";

import React from "react";
import { Button } from "antd";

const Home = () => {
  const showAlert = () => {
    alert("This is an alert message!");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Welcome to My Page</h1>
      <Button type="primary" onClick={showAlert}>
        Show Alert
      </Button>
    </div>
  );
};

export default Home;
