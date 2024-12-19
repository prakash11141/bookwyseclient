"use client";

import React, { useState, useEffect } from "react";
import { Table, Input, Button, Pagination, Form, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    isActive: null,
    subscriptionPlan: "",
    page: 1,
    limit: 10,
  });
  const [totalCount, setTotalCount] = useState(0);

  // Fetch organizations with filters
  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("No token found, please log in!");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        "http://localhost:4000/organizations/filters",
        {
          params: {
            search: filters.search,
            isActive: filters.isActive,
            subscriptionPlan: filters.subscriptionPlan,
            page: filters.page,
            limit: filters.limit,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrganizations(response.data.data); // Update table data
      setTotalCount(response.data.total); // Update total count
    } catch (error) {
      console.error("Error fetching organizations:", error);
      message.error("Failed to fetch organizations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination change
  const handlePageChange = (page: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  // Handle filter change
  const handleFilterChange = (changedValues: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...changedValues,
    }));
  };

  // Handle search submit
  const handleSearch = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1, // Reset to first page on search
    }));
  };

  // Fetch data when filters change
  useEffect(() => {
    fetchOrganizations();
  }, [filters]);

  // Table columns
  const columns = [
    {
      title: "Organization Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Subscription Plan",
      dataIndex: "subscriptionPlan",
      key: "subscriptionPlan",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Organizations List</h2>
      {/* Filter Form */}
      <Form
        layout="inline"
        onFinish={handleSearch}
        style={{ marginBottom: "20px" }}
      >
        <Form.Item label="Search" name="search">
          <Input
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            placeholder="Search by organization name"
          />
        </Form.Item>
        <Form.Item label="Status" name="isActive">
          <Select
            value={filters.isActive}
            onChange={(value) => handleFilterChange({ isActive: value })}
            placeholder="Select status"
            allowClear
          >
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Subscription Plan" name="subscriptionPlan">
          <Select
            value={filters.subscriptionPlan}
            onChange={(value) =>
              handleFilterChange({ subscriptionPlan: value })
            }
            placeholder="Select plan"
            allowClear
          >
            <Option value="free">Free</Option>
            <Option value="premium">Premium</Option>
            <Option value="ultra">Ultra</Option>
            <Option value="basic">Basic</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Apply Filters
          </Button>
        </Form.Item>
      </Form>

      {/* Table */}
      <Table
        loading={loading}
        columns={columns}
        dataSource={organizations}
        rowKey="id"
        pagination={false}
      />

      {/* Pagination */}
      <Pagination
        current={filters.page}
        total={totalCount}
        pageSize={filters.limit}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default OrganizationList;
