import Layout from "@/components/layout/layout";
import ProfilePage from "@/pages/adminProfile";
import CreateBookPage from "@/pages/createBookPage";
import BooksPage from "@/pages/bookPage";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/registerPage";
import { createBrowserRouter } from "react-router-dom";
import UpdateBookPage from "@/pages/updateBookPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
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
]);
