import { Outlet, Link } from "react-router-dom";
import "../styles/layout/layout.css";

const Layout = ({ routes }) => {
  return (
    <div className="layout">
      <aside className="sidebar">
        {routes.map((route) => (
          <div key={`key-${route.label}`} className="sidebar-links">
            <Link className="sidebar-link" to={route.path}>
              {route.label}
            </Link>
          </div>
        ))}
      </aside>
      <main className="main">
        <header className="header">Amnil React Tasks</header>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
