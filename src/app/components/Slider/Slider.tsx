import React from "react";
import { Button } from "antd";

import { useRouter } from "next/navigation";
// Import useNavigate hook

const Slider: React.FC = () => {
  const router = useRouter(); // Initialize the router

  const handleViewAllOrganizations = () => {
    router.push("organizations/viewall"); // Use router.push for navigation
  };
  const handleAddOrganization = () => {
    router.push("organizations/add");
  };
  const handleSearchOrganizaion = () => {
    router.push("organizations/search");
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      <Button type="primary" onClick={handleViewAllOrganizations}>
        View Organizations
      </Button>
      <Button type="primary" onClick={handleAddOrganization}>
        Add Organization
      </Button>
      <Button type="primary" onClick={handleSearchOrganizaion}>
        Search Organization
      </Button>
    </div>
  );
};

export default Slider;
