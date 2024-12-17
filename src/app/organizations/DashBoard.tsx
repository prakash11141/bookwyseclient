"use client"; // Ensure this is a client-side component
import React from "react";
import { Layout, Breadcrumb, Button, theme } from "antd";
import { useRouter } from "next/navigation"; // To navigate to a new route
import Sider from "../components/Slider/Slider";

const { Content } = Layout;

const DashBoard: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Layout>
        {/* Sider */}
        <Layout.Sider width={200} style={{ background: colorBgContainer }}>
          <Sider />
        </Layout.Sider>

        {/* Content */}
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            items={[{ title: "Home" }, { title: "Dashboard" }]}
            style={{ margin: "16px 0" }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Content for the Dashboard */}
            <div>Dashboard Content</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
