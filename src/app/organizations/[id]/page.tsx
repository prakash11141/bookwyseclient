"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import axios from "axios";
import { Form, Input, Button, message, Spin, notification, Alert } from "antd";

const EditOrganizationPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams(); // Get the dynamic id from the route
  const router = useRouter();
  const [organization, setOrganization] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("No token found, please log in!");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/organizations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setOrganization(response.data);
        } else {
          message.error("Failed to fetch organization details.");
        }
      } catch (error) {
        message.error("An error occurred while fetching organization.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [id]);

  const handleSave = async (values: any) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("No token found, please log in!");
        return;
      }

      const response = await axios.patch(
        `http://localhost:4000/organizations/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        // router.push("/organizations/viewall");
      } else {
        message.error("Failed to update organization.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong! Please try again.";

        notification.error({
          message: "Error",
          description: errorMessage,
          duration: 5,
          placement: "topRight",
        });
      } else {
        // Handle non-Axios errors
        message.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <p>Loading organization details...</p>
      </div>
    );
  }

  if (!organization) {
    return <p>No organization data found.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
      }}
    >
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "600px",
          boxSizing: "border-box", // Ensures padding is included in width
        }}
      >
        <h1>Edit Organization</h1>
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
        <Form
          layout="vertical"
          initialValues={organization}
          onFinish={handleSave}
        >
          <Form.Item
            name="name"
            label="Organization Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please input the status!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subscriptionPlan"
            label="Subscription Plan"
            rules={[
              {
                required: true,
                message: "Please input the subscription plan!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditOrganizationPage;
