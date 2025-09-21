import { Routes, Route } from "react-router-dom";
import HelloWorldPage from "./pages/task1/HelloWorldPage";
import CounterPage from "./pages/task2/CounterPage";
import FormPage from "./pages/task3/FormPage";
import PropsLifting from "./pages/task4/PropsLifting";
import Layout from "./pages/Layout";
import Homepage from "./pages/task4/Homepage";

const routeList = [
  { path: "/task1", label: "Task 1", element: <HelloWorldPage /> },
  { path: "/task2", label: "Task 2", element: <CounterPage /> },
  { path: "/task3", label: "Task 3", element: <FormPage /> },
  { path: "/task4", label: "Task 4", element: <PropsLifting /> },
];

function App() {
  return (
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
  );
}

export default App;
