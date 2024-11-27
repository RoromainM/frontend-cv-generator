import React, { useState } from "react";
import { loginUser } from "../service/backendFetch";
import FormInput from "../components/FormInput";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState(null);  // Gérer les erreurs
  const [loading, setLoading] = useState(false);  // Gérer le chargement

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      console.log("Login successful:", response);
      // Vous pouvez rediriger ou gérer l'utilisateur connecté ici
    } catch (err) {
      console.error("Error during login:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="card shadow-lg p-4" style={{ borderRadius: "25px", backgroundColor: "#ebf5fa" }}>
              <form onSubmit={handleSubmit}>
                {/* Email input */}
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter a valid email address"
                />
                {/* Password input */}
                <FormInput
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                {error && <p className="text-danger">{error}</p>}
                {/* Submit button */}
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
