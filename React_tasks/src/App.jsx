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

const routeList = [
  { path: "/task1", label: "Task 1", element: <HelloWorldPage /> },
  { path: "/task2", label: "Task 2", element: <CounterPage /> },
  { path: "/task3", label: "Task 3", element: <FormPage /> },
  { path: "/task4", label: "Task 4", element: <PropsLifting /> },
  { path: "/task5", label: "Task 5/6/7", element: <Context /> },
  { path: "/task8", label: "Task 8", element: <FormValidationPage /> },
  { path: "/task9", label: "Task 9", element: <TabsPage /> },
];

function App() {
  return (
    <ThemeProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<Layout routes={routeList} />}>
            <Route index element={<Homepage />} />

            {routeList.map((route) => (
              <Route
                key={`key-${route.label}`}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </CartContextProvider>
    </ThemeProvider>
  );
}

export default App;
