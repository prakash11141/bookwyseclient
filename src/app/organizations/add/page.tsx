"use client";
import React, { useState } from "react";
import { Button, Form, Input, Card, message, Alert } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddOrganization: React.FC = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log("Form Values: ", values);

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("No token found, please log in!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/organizations",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setShowAlert(true);
        form.resetFields();
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      } else {
        message.error("Failed to add organization. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card title="Add Organization" style={styles.card} bordered={false}>
        {showAlert && (
          <Alert
            message="Organization added successfully!"
            type="success"
            showIcon
            closable
            afterClose={() => setShowAlert(false)} // Hide alert after close
            style={{ marginBottom: "20px" }}
          />
        )}
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Organization Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the organization name!",
              },
            ]}
          >
            <Input placeholder="Organization name" />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input the status!" }]}
          >
            <Input placeholder="Status" />
          </Form.Item>
          <Form.Item
            label="Subscription Plan"
            name="subscriptionPlan"
            rules={[
              {
                required: true,
                message: "Please input the subscription plan!",
              },
            ]}
          >
            <Input placeholder="Subscription plan" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  card: {
    width: "400px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },
};

export default AddOrganization;
