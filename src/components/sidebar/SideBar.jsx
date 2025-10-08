import { useState, useEffect } from "react";
import SideBarNavItem from "./SideBarNavItem";
import OrganizationSelector from "./OrganizationSelector";
import "./sidebar.css";
import { ColorVariables } from '../../constants/ColorVariables';
import { applyColorVariables } from "../../pages/common";

const Sidebar = ({ currentOrganization }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  useEffect(() => {
    applyColorVariables(ColorVariables)
  }, []);

  const navItems = [
    { label: "Products", icon: "📦" },
    { label: "Orders", icon: "🧾" },
    { label: "Customers", icon: "👥" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="sidebar">
      <OrganizationSelector
        organizationName={currentOrganization}
        isActive={false}
        onClick={() => alert("Organization Selector Clicked")}
      />
      {navItems.map((item) => (
        <SideBarNavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          isActive={activeItem === item.label}
          onClick={() => setActiveItem(item.label)}
        />
      ))}
    </div>
  );
};

export default Sidebar;
