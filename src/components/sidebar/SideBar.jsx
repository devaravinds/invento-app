import { useState, useEffect } from "react";
import SideBarNavItem from "./SideBarNavItem";
import OrganizationSelector from "./OrganizationSelector";
import "./sidebar.css";
import { ColorVariables } from '../../constants/ColorVariables';
import { applyColorVariables } from "../../pages/common";

const Sidebar = ({ currentOrganization, activeItem, setActiveItem }) => {

  useEffect(() => {
    applyColorVariables(ColorVariables)
  }, []);

  const navItems = [
    { path: '/products', label: "Products", icon: "📦" },
    { path: '/outlets', label: "Outlets", icon: "🏬" },
    { path: '/partners', label: "Partners", icon: "👥" },
    { path: '/transactions', label: "Transactions", icon: "🧾" },
    { path: '/units', label: "Units", icon: "🔢" },
    { path: '/settings', label: "Settings", icon: "⚙️" },
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
          isActive={activeItem === item.path}
          onClick={() => setActiveItem(item.path)}
        />
      ))}
    </div>
  );
};

export default Sidebar;
