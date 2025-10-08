import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SideBar from "../../components/sidebar/SideBar";
import ErrorBoundary from "../../boundary/ErrorBoundary";
import Error from "../Error/Error"

const Dashboard = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
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
          return <Error />;
        }
        const organizations = await response.json();
        setOrganizations(organizations.data);
      }
      catch (error) {
        console.error("Error calling dashboard API:", error);
      }
    };
    fetchData();
  }, [])
  return (
    <ErrorBoundary>
      <h1>Dashboard Page</h1>
      <SideBar
        currentOrganization={organizations.length > 0 ? organizations[0].name : null}
      />
      <Outlet />
    </ErrorBoundary>
  );
};

export default Dashboard;
