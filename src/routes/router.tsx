import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Layout from "../pages/LayoutPage/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
