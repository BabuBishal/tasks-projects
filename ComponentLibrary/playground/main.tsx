import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ThemeProvider from "./context/ThemeContext";
import "./index.css";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <div>Home</div> },
      { path: "about", element: <div>About</div> },
    ],
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
