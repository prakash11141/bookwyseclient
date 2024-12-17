"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, message, Typography } from "antd";
const { Title, Text } = Typography;

const DeleteOrganizationPage = () => {
  const [messageApi] = message.useMessage();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [organization, setOrganization] = useState<any>(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("No token found, please log in!");
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:4000/organizations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOrganization(data);
        } else {
          const error = await response.json();
          throw new Error(
            error.message || "Failed to fetch organization details"
          );
        }
      } catch (error: any) {
        message.error(error.message);
        router.push("/organizations/viewall");
      }
    };

    if (id) fetchOrganization();
  }, [id, router]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("No token found, please log in!");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4000/organizations/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        messageApi.success("Organization deleted successfully");
        router.push("/organizations/viewall");
      } else {
        const error = await response.json();
        message.error(error.message || "Failed to delete the organization");
      }
    } catch (error) {
      message.error("An unexpected error occurred");
    }
  };

  if (!organization) return <p>Loading...</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div>
        <Title type="danger">Delete Organization</Title>
        <p>
          <Text type="danger">
            Are you sure you want to delete the organization:{" "}
          </Text>
        </p>
        <p>Name: {organization.name}</p>
        <p>Status: {organization.status}</p>
        <p>Subscription Plan: {organization.subscriptionPlan}</p>
        <Button type="primary" danger onClick={handleDelete}>
          Confirm Delete
        </Button>
        <Button
          type="default"
          onClick={() => router.push("/organizations/viewall")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteOrganizationPage;
