// Dashboard.jsx
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/SideBar";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h2>Welcome to your Dashboard</h2>;
      case "Products":
        return <h2>Manage your Products here</h2>;
      case "Orders":
        return <h2>View and process Orders</h2>;
      case "Customers":
        return <h2>Customer details and insights</h2>;
      case "Settings":
        return <h2>Adjust your Settings</h2>;
      default:
        return <h2>Select an option from the sidebar</h2>;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
