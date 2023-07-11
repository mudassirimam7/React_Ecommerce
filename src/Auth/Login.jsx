import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginFormValidationSchema from "../Auth/schema/Yup";
import { API_URL } from "../Config/Constant";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data.status) {
        sessionStorage.setItem("token", data.data.token);
        navigate("/home");
      } else {
        setErrorMsg(data.message || "Failed to log in");
        if (data.message === "User not found") {
          setErrorMsg("Email or password is incorrect.");
        }
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <LoginForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

const LoginForm = ({ onSubmit, loading }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row justify-content-center">
            <div className="col-4">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginFormValidationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="btn btn-primary me-2"
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>
                    <div className="btn-list mt-3">
                      <Link to="/register-user">
                        Don't have an account? Please register
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Login;

