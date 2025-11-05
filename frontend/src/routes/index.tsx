import HomePage from "@/pages/homePage";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/registerPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  { path: "/", element: <HomePage /> },
]);
