"use client"; // Make sure this is a client-side page

import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./LoginForm"), {
  ssr: false,
});

const LoginPage: React.FC = () => {
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  ></div>;
  return <LoginForm />;
};

export default LoginPage;
