// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { API_URL } from "../Config/Constant";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`${API_URL}/api/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           c_password: confirmPassword
//         }),
//       });

//       const { token } = await response.json();

//       localStorage.setItem("token", token);

//       setName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       navigate("/");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="container ">
//       <h1 className="my-5 text-center">Register</h1>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Name:
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email:
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password:
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="confirm-password" className="form-label">
//             Confirm Password:
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="confirm-password"
//             value={confirmPassword}
//             onChange={(event) => setConfirmPassword(event.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Register
//         </button>
//         <Link to="/login" className="mx-3">
//           Already have an account? Login here.
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../Config/Constant";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          c_password: confirmPassword,
        }),
      });

      const { token } = await response.json();

      localStorage.setItem("token", token);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      navigate("/");
    } 
    catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row justify-content-center">
            <div className="col-5">
              <h1 className="my-5 text-center">Register</h1>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
                {loading ? (
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                )}
                <Link to="/" className="d-block mt-3">
                  Already have an account? Log in
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
