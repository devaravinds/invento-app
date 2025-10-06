import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/Login/Login.jsx';
// import Dashboard from '../pages/Dashboard/Dashboard';
import { Paths } from '../constants/Paths.jsx';
import Dashboard from '../pages/Dashboard/Dashboard';


export const Router = createBrowserRouter([
  {
    path: Paths.Login,
    element: <LoginPage />,
  },
  {
    path: Paths.Dashboard,
    element: <Dashboard />,
  }
]);