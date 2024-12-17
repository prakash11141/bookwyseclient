"use client"; // Make sure this is a client-side page

import dynamic from "next/dynamic";

const DashBoard = dynamic(() => import("./DashBoard"), {
  ssr: false,
});

const OrganizationPage: React.FC = () => {
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  ></div>;
  return <DashBoard />;
};

export default OrganizationPage;
