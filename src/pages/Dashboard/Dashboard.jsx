import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SideBar from "../../components/sidebar/SideBar";
import ErrorBoundary from "../../boundary/ErrorBoundary";
import Error from "../Error/Error"
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [activeItem, setActiveItem] = useState("/products");
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/current/organizations`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          setHasError(true);
        }
        const organizations = await response.json();
        setOrganizations(organizations.data);
      }
      catch (error) {
        console.error("Error calling dashboard API:", error);
        setHasError(true);
      }
    };
    fetchData();
  }, [navigate])

  useEffect(() => {
    if (organizations.length > 0) {
      const orgId = organizations[0].id;
      navigate(`${orgId}${activeItem}`);
    }
  }, [organizations, navigate, activeItem]);

  if (hasError) return <Error />;
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
