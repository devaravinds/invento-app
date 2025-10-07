import "./sidebarNavItem.css";

const SideBarNavItem = ({ icon, label, isActive, onClick }) => {
  return (
    <div
      className={`sidebar-nav-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="icon">{icon}</span>
      <span className="label">{label}</span>
    </div>
  );
};

export default SideBarNavItem;
