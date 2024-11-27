import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/backendFetch";
import { AuthContext } from "../context/AuthContext";
import FormInput from "../components/FormInput";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData);

      if (response.success) {
        login({ token: response.token });

        console.log("Login successful, token stored:", response.token);
        navigate("/");
      } else {
        setError(response.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
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
                <FormInput type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Entrer votre email" />
                {/* Password input */}
                <FormInput type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Entrer votre mot de passe" />
                {/* Display errors */}
                {error && <p className="text-danger">{error}</p>}
                {/* Submit button */}
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} disabled={loading}>
                    {loading ? "Chargement..." : "Se connecter"}
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
