import { Outlet, Link } from "react-router-dom";
import "../styles/layout/layout.css";
import PropTypes from "prop-types";

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

Layout.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      element: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default Layout;
