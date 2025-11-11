import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Sidebar />
        <div className="outlet-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
