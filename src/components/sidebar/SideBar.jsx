import { useState, useEffect } from "react";
import SideBarNavItem from "./SideBarNavItem";
import "./sidebar.css";
import { ColorVariables } from '../../constants/ColorVariables';
import { applyColorVariables } from "../../pages/common";

const Sidebar = () => {
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
