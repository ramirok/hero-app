import { Formik } from "formik";
import axios from "axios";
import { saveToken } from "../../libs/localStorage";
import { useHistory } from "react-router-dom";

import classes from "./loginForm.module.css";
import { useState } from "react";

const LoginForm = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const submitLoginForm = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://challenge-react.alkemy.org/", {
        email: values.email,
        password: values.password,
      });
      if (response.statusText === "OK") {
        setSubmitting(false);
        saveToken({ token: response.data.token });
        history.push("/");
      }
    } catch (error) {
      setErrorMessage("Failed, please try again");
    }
  };

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
        return errors;
      }}
      onSubmit={submitLoginForm}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {
        return (
          <form
            onSubmit={handleSubmit}
            className={`border border-2 border-dark bg-white p-3 ${classes.formContainer}`}
          >
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="exampleInputEmail1" className="htmlForm-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="htmlForm-control border-top-0 border-end-0 border-start-0 rounded-3 bg-light p-1"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="challenge@alkemy.org"
              />
              <span className={classes.error}>
                {errors.email && touched.email && errors.email}
              </span>
            </div>

            <div className="mb-3 d-flex flex-column">
              <label htmlFor="exampleInputPassword1" className="htmlForm-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="htmlForm-control border-top-0 border-end-0 border-start-0 rounded-3 bg-light p-1"
                id="exampleInputPassword1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="react"
              />
              <span className={classes.error}>
                {errors.password && touched.password && errors.password}
              </span>
            </div>

            <div className="mb-3 d-flex flex-column">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary rounded-3 border-1"
              >
                Enviar
              </button>
              <span className={classes.error}>{errorMessage}</span>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
