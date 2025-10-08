import { Routes, Route } from "react-router-dom";
import HelloWorldPage from "./pages/task1/HelloWorldPage";
import CounterPage from "./pages/task2/CounterPage";
import FormPage from "./pages/task3/FormPage";
import PropsLifting from "./pages/task4/PropsLifting";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Context from "./pages/task5/ContextPage";
import { CartContextProvider } from "./context/CartContextProvider";
import ThemeProvider from "./context/ThemeProvider";
import FormValidationPage from "./pages/task8/FormValidationPage";
import TabsPage from "./pages/TabsPage";
import Login from "./pages/login/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

const routeList = [
  {
    path: "/tasks/task1",
    label: "Task 1",
    element: <HelloWorldPage />,
    protected: true,
  },
  {
    path: "/tasks/task2",
    label: "Task 2",
    element: <CounterPage />,
    protected: true,
  },
  {
    path: "/tasks/task3",
    label: "Task 3",
    element: <FormPage />,
    protected: true,
  },
  {
    path: "/tasks/task4",
    label: "Task 4",
    element: <PropsLifting />,
    protected: true,
  },
  {
    path: "/tasks/task5",
    label: "Task 5/6/7",
    element: <Context />,
    protected: true,
  },
  {
    path: "/tasks/task8",
    label: "Task 8",
    element: <FormValidationPage />,
    protected: true,
  },
  {
    path: "/tasks/task9",
    label: "Task 9",
    element: <TabsPage />,
    protected: true,
  },
];

function App() {
  return (
    <ThemeProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Layout routes={routeList} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Homepage />} />

            {routeList.map((route) => (
              <Route
                key={`key-${route.label}`}
                path={route.path}
                element={
                  route.protected ? (
                    <ProtectedRoute>{route.element}</ProtectedRoute>
                  ) : (
                    route.element
                  )
                }
              />
            ))}
          </Route>
        </Routes>
      </CartContextProvider>
    </ThemeProvider>
  );
}

export default App;
