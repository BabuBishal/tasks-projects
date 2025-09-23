import { Routes, Route } from "react-router-dom";
import HelloWorldPage from "./pages/task1/HelloWorldPage";
import CounterPage from "./pages/task2/CounterPage";
import FormPage from "./pages/task3/FormPage";
import PropsLifting from "./pages/task4/PropsLifting";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Context from "./pages/task5/Context";
import { CartContextProvider } from "./hooks/CartContextProvider";

const routeList = [
  { path: "/task1", label: "Task 1", element: <HelloWorldPage /> },
  { path: "/task2", label: "Task 2", element: <CounterPage /> },
  { path: "/task3", label: "Task 3", element: <FormPage /> },
  { path: "/task4", label: "Task 4", element: <PropsLifting /> },
  { path: "/task5", label: "Task 5", element: <Context /> },
];

function App() {
  return (
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
  );
}

export default App;
