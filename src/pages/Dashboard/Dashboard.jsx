import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/SideBar";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard Page</h1>
      <Sidebar></Sidebar>
      <Outlet />
    </>
  );
};

export default Dashboard;
