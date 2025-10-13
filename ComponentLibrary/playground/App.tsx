import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
