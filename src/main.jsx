import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import AllTasks from "./components/pages/AllTasks";
import Important from "./components/pages/Important";
import MyDay from "./components/pages/MyDay";
import Planned from "./components/pages/Planned";
import { LogicProvider } from "./components/Logic";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/all-tasks", element: <AllTasks /> },
      { path: "/important", element: <Important /> },
      { path: "/my-day", element: <MyDay /> },
      { path: "/planned", element: <Planned /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LogicProvider>
      <RouterProvider router={router} />
    </LogicProvider>
  </StrictMode>,
);
