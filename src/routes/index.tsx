import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Customers from "../pages/Customers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/customers" replace />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
