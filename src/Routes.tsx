
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Dashboard } from "./pages/Dashboard";

import ErrorPage from "./pages/Error";
import { Profile } from "./pages/Profile";
import UserErrorPage from "./pages/UserError";
import { userLoader } from "./services/route_loader";
import { getUser } from "./services/user";

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

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <AdminDashboard />,
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

  const user = getUser()!;

  const userRouter = (() => {
    if (user.access === "admin") {
      return adminRouter
    }
    return router
  })()

  return (
    <>
      <Navbar />
      <RouterProvider router={userRouter} />
    </>
  )
}
