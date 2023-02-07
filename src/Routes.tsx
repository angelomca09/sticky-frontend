
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { Albums } from "./pages/Albums";
import { Dashboard } from "./pages/Dashboard";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />
  },
  {
    path: "/albuns",
    element: <Albums />,
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
