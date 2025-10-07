import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/Login/Login.jsx';
import { Paths } from '../constants/Paths.jsx';
import Dashboard from '../pages/Dashboard/Dashboard';
import Products from '../pages/Products/Products';


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
        path: `:organizationId${Paths.Products}`,
        element: <Products />,
      }
    ]
  }
]);