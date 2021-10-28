import LoginForm from "../../components/loginForm/loginForm";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import classes from "./loginPage.module.css";

const LoginPage = () => {
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center position-relative">
        <div className="col col-md-4 align-items-center position-relative d-flex flex-column min-vh-100">
          <Logo />
          <div className="flex-grow-1 d-flex align-items-center justify-content-center w-100">
            <LoginForm />
          </div>
          <div className={classes.footer}>
            Made by Luis Ramiro Krupoviesa {new Date().getFullYear()}
          </div>
        </div>

        {/* <div className="col-8 d-md-block d-none bg-dark">landing content</div> */}
      </div>
    </div>
  );
};

export default LoginPage;
