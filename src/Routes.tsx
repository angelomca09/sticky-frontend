
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { Dashboard } from "./pages/Dashboard";

import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />
  },
]);


export const Routes = () => {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  )
}
