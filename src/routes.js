import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import { loadToken } from "./libs/localStorage";
import Details from "./pages/details/details";
import Home from "./pages/home/home";
import LoginPage from "./pages/loginPage/loginPage";
import Page404 from "./pages/page404/page404";
import Search from "./pages/search/search";

const ROUTES = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    Component: () => {
      return loadToken() ? (
        <Redirect to={"/app"} />
      ) : (
        <Redirect to={"/auth/login"} />
      );
    },
  },
  {
    path: "/app",
    key: "APP",
    Component: (props) => {
      return loadToken() ? (
        <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center">
          <RenderRoutes {...props} />
          <NavBar />
        </div>
      ) : (
        <Redirect to={"/auth/login"} />
      );
    },
    routes: [
      {
        path: "/app",
        key: "HOME",
        exact: true,
        Component: Home,
      },
      {
        path: "/app/hero/search",
        key: "SEARCH",
        exact: true,
        Component: Search,
      },
      {
        path: "/app/hero/:id",
        key: "DETAILS",
        exact: true,
        Component: Details,
      },
    ],
  },
  {
    path: "/auth",
    key: "AUTH",
    Component: (props) => {
      return loadToken() ? (
        <Redirect to={"/app"} />
      ) : (
        <RenderRoutes {...props} />
      );
    },
    routes: [
      {
        path: "/auth/login",
        key: "AUTH_LOGIN",
        exact: true,
        Component: LoginPage,
      },
    ],
  },
];

export default ROUTES;

const RouteWithSubRoutes = (props) => {
  const { route } = props;

  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={() => <route.Component routes={route.routes} />}
    />
  );
};

export const RenderRoutes = (props) => {
  return (
    <Switch>
      {props.routes.map((route) => {
        return <RouteWithSubRoutes route={route} {...route} />;
      })}
      <Route component={Page404} />
    </Switch>
  );
};
