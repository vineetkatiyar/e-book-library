import Layout from "@/components/layout/layout";
import ProfilePage from "@/pages/adminProfile";
import CreateBookPage from "@/pages/createBookPage";
import BooksPage from "@/pages/bookPage";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/registerPage";
import { createBrowserRouter } from "react-router-dom";
import UpdateBookPage from "@/pages/updateBookPage";
import AuthLayout from "@/components/layout/authLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <BooksPage />,
      },
      {
        path: "books/create",
        element: <CreateBookPage />,
      },
      {
        path: "books/edit/:id",
        element: <UpdateBookPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
