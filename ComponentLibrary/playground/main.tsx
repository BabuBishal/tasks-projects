import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ThemeProvider from "./context/ThemeContext";
import "./index.css";
import App from "./App";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Homepage /> }],
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
