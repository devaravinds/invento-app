import React, { useState } from "react";
import SideBarNavItem from "./SideBarNavItem";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems = [
    { label: "Dashboard", icon: "🏠" },
    { label: "Products", icon: "📦" },
    { label: "Orders", icon: "🧾" },
    { label: "Customers", icon: "👥" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="sidebar">
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
