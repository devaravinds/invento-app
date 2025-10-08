import "./organizationSelector.css";


const OrganizationSelector = ({ organizationName, isActive, onClick }) => {
  return (
    <div
      className={`organization-selector ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="label">{organizationName}</span>
    </div>
  );
};

export default OrganizationSelector;
