
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { Dashboard } from "./pages/Dashboard";

import ErrorPage from "./pages/Error";
import { Profile } from "./pages/Profile";
import UserErrorPage from "./pages/UserError";
import { userLoader } from "./services/route_loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />
  },
  {
    path: "/perfil/:username",
    element: <Profile />,
    errorElement: <UserErrorPage />,
    loader: userLoader
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
