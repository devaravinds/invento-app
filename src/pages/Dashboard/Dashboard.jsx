import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import ErrorBoundary from "../../boundary/ErrorBoundary";
import Error from "../Error/Error";
import "./dashboard.css";
import { fetchData } from "../../common";
const Dashboard = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [activeItem, setActiveItem] = useState("/products");
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchData(
      navigate,
      setOrganizations,
      setError,
      "/users/current/organizations"
    );
  }, [navigate]);

  useEffect(() => {
    if (organizations?.length > 0) {
      const orgId = organizations[0].id;
      sessionStorage.setItem("currentOrganizationId", orgId);
      navigate(`${orgId}${activeItem}`);
    }
  }, [organizations, navigate, activeItem]);

  if (error) return <Error message={error} />;
  return (
    <ErrorBoundary>
      <div className="dashboard-container">
        <SideBar
          currentOrganization={
            organizations.length > 0 ? organizations[0].name : null
          }
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
