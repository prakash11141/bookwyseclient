import React, { useState } from "react";
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  userId: string;
  name: string;
  email: string;
  role: string;
  // Add other properties as per your token structure
}

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      // Send POST request to the backend
      const response = await axios.post("http://localhost:4000/auth/login", {
        email: values.email,
        password: values.password,
      });

      // Destructure the token and user data from response
      const { accessToken } = response.data;

      // Decode the JWT token (only if the backend is sending a JWT token)
      const decodedToken = jwtDecode<DecodedToken>(accessToken);

      // Store token and user data in localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(decodedToken));

      // Optionally, log the decoded user data for debugging
      console.log("User Data:", decodedToken);

      // Success message
      message.success(`Welcome ${decodedToken.name || "User"}!`);

      // Redirect to another page
      router.push("/organizations");
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error("Please fill out all required fields.");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        title="Login"
        bordered={false}
        style={{
          width: 400,
          padding: "20px", // Space inside the card
        }}
      >
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
