import {createBrowserRouter} from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // 여기에 과제에 해당하는 페이지를 추가해서 개발해주세요.
    ],
  },
]);

export default router;
