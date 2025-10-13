import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles/layout/layout.css";
import PropTypes from "prop-types";
import Cart from "../components/Cart";
import ThemeButton from "../components/ThemeButton";
import Button from "../components/Button";

const Layout = ({ routes }) => {
  const navigate = useNavigate();
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
        <header className="header">
          <span className="logo">Amnil Internship Tasks</span>
          <div className="header-actions">
            <ThemeButton />
            <Cart />
            <Button
              onClick={() => {
                localStorage.removeItem("isAuthenticated");
                navigate("/");
              }}
              buttonText="Logout"
              variant="secondary small"
            ></Button>
          </div>
        </header>
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
