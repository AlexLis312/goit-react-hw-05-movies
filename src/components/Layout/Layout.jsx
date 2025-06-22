import { NavLink, Outlet } from "react-router-dom";
import "./Layout.styled.css";

const Layout = () => {
  return (
    <div>
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            {" "}
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Movies{" "}
          </NavLink>
        </li>
      </ul>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
