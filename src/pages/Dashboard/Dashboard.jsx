import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import ErrorBoundary from "../../boundary/ErrorBoundary";
import Error from "../Error/Error";
import "./dashboard.css";
import { fetchData } from "../../common";

const Dashboard = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const location = useLocation();

  const getInitialActiveItem = () => {
    if (location.pathname.includes("/transactions")) return "/transactions";
    if (location.pathname.includes("/partners")) return "/partners";
    if (location.pathname.includes("/inventory")) return "/inventory";
    if (location.pathname.includes("/outlets")) return "/outlets";
    if (location.pathname.includes("/units")) return "/units";
    if (location.pathname.includes("/settings")) return "/settings";
    return "/products";
  };

const [activeItem, setActiveItem] = useState(getInitialActiveItem());  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(navigate, setOrganizations, setError, "/users/current/organizations");
  }, [navigate]);

  useEffect(() => {
    if (organizations.length > 0) {
      const orgId = organizations[0].id;
      sessionStorage.setItem("currentOrganizationId", orgId);

      if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
        navigate(`${orgId}${activeItem}`, { replace: true });
      }
    }
  }, [organizations, navigate, location.pathname, activeItem]);

  useEffect(() => {
    if (organizations.length > 0 && location.pathname.startsWith("/dashboard")) {
      const orgId = organizations[0].id;
      navigate(`${orgId}${activeItem}`);
    }
  }, [activeItem, navigate, location.pathname, organizations]);
  if (error) return <Error message={error} />;

  return (
    <ErrorBoundary>
      <div className="dashboard-container">
        <SideBar
          currentOrganization={organizations.length > 0 ? organizations[0].name : null}
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
