import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/Login/Login.jsx';
import { Paths } from '../constants/Paths.jsx';
import Dashboard from '../pages/Dashboard/Dashboard';
import Products from '../pages/Products/Products';
import Outlets from '../pages/Outlets/Outlets';
import Partners from '../pages/Partners/Partners';
import Transactions from '../pages/Transactions/Transactions';
import Units from '../pages/Units/Units';
import Settings from '../pages/Settings/Settings';

export const Router = createBrowserRouter([
  {
    path: Paths.Login,
    element: <LoginPage />,
  },
  {
    path: Paths.Dashboard,
    element: <Dashboard />,
    children: [
      {
        path: ':organizationId' + Paths.Products,
        element: <Products />,
      },
      {
        path: ':organizationId' + Paths.Outlets,
        element: <Outlets />,
      },
      {
        path: ':organizationId' + Paths.Partners,
        element: <Partners />,
      },
      {
        path: ':organizationId' + Paths.Transactions,
        element: <Transactions />,
      },
      {
        path: ':organizationId' + Paths.Units,
        element: <Units />,
      },
      {
        path: ':organizationId' + Paths.Settings,
        element: <Settings />,
      },
    ],
  },
]);
