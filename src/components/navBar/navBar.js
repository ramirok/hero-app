import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { clearToken } from "../../libs/localStorage";
import classes from "./navBar.module.css";

const NavBar = () => {
  const history = useHistory();
  const submitLogout = () => {
    clearToken();
    history.push("/");
  };
  return (
    <span className={classes.navBar}>
      <nav className="navbar navbar-expand-lg navbar-light rounded-3 bg-white border border-2 border-dark mt-lg-4 mt-0 mb-lg-1 mb-0 p-1">
        <div className="container-fluid p-0">
          <button
            className="navbar-toggler m-1 border border-gray border-2"
            type="button "
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className={`${classes.buttonIcon}`}></div>
          </button>
          <div
            className={`collapse navbar-collapse ${classes.panel}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-item ${classes.item}`}>
                <NavLink
                  className="nav-link"
                  to="/app/hero/search"
                  activeClassName={`${classes.activeLink}`}
                >
                  Add Member
                  <i className="bi bi-person-plus-fill ms-1"></i>
                </NavLink>
              </li>
              <li className={`nav-item ${classes.item}`}>
                <NavLink
                  exact
                  className="nav-link"
                  to="/app"
                  activeClassName={`${classes.activeLink}`}
                >
                  Team
                  <i className="bi bi-diagram-2-fill ms-1"></i>
                </NavLink>
              </li>
              <li className={`nav-item ${classes.item}`}>
                <span className="nav-link btn" onClick={submitLogout}>
                  Logout User
                  <i className="bi bi-box-arrow-in-left ms-1"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </span>
  );
};

export default NavBar;
