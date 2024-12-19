// app/view-all/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Spin, message, Button, Radio } from "antd";
import { useRouter } from "next/navigation";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const ViewAllPage: React.FC = () => {
  const router = useRouter();

  const [organizations, setOrganizations] = useState<any[]>([]); // State to store organizations
  const [loading, setLoading] = useState<boolean>(false); // State for loading spinner
  const [error, setError] = useState<string | null>(null); // State to store any error message
  const handleEditOrganization = (id: number) => {
    router.push(`/organizations/${id}`);
  };
  const handleDeleteOrganization = (id: number) => {
    router.push(`/organizations/${id}/delete`);
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);

      setError(null); // Clear any previous errors
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("No token found, please log in!");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:4000/organizations",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          }
        );

        if (response.status === 200) {
          setOrganizations(response.data);
        } else {
          message.error("Failed to fetch organizations.");
        }
      } catch (error) {
        setError("Failed to fetch organizations.");
        message.error("An error occurred while fetching organizations.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);
  return (
    <Spin spinning={loading} size="large" tip="Loading organizations...">
      <div style={{ padding: "20px" }}>
        <h1>All Organizations</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && organizations.length === 0 && !error && (
          <p>No organizations available.</p>
        )}
        {!loading && organizations.length > 0 && (
          <Row gutter={[16, 16]}>
            {organizations.map((org: any) => (
              <Col span={8} key={org.id}>
                <Card
                  extra={
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/organizations/${org.id}`);
                      }}
                    >
                      More
                    </a>
                  }
                  title={org.name}
                  bordered={false}
                  style={{ width: "100%", position: "relative" }}
                >
                  {/* Radio buttons to display the status */}
                  <p>
                    Status:
                    <Radio.Group
                      value={org.isActive ? "Active" : "Inactive"}
                      disabled
                      style={{
                        opacity: 1,
                        pointerEvents: "none",
                        width: "100%",
                      }}
                    >
                      <Radio
                        value="Active"
                        style={{
                          color: org.isActive ? "green" : "gray",
                          fontWeight: "bold",
                        }}
                      >
                        Active
                      </Radio>
                      <Radio
                        value="Inactive"
                        style={{
                          color: !org.isActive ? "red" : "gray",
                          fontWeight: "bold",
                        }}
                      >
                        Inactive
                      </Radio>
                    </Radio.Group>
                  </p>
                  <p>Subscription Plan: {org.subscriptionPlan}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => handleEditOrganization(org.id)}
                    >
                      Edit <EditTwoTone />
                    </Button>
                    <Button
                      danger
                      onClick={() => handleDeleteOrganization(org.id)}
                    >
                      Delete
                      <DeleteTwoTone twoToneColor="red" />
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Spin>
  );
};

export default ViewAllPage;
