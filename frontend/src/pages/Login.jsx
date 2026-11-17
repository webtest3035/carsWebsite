import { GoogleLogin } from "@react-oauth/google";
import { Link, Navigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { user, login } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/products";

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSuccess = async (response) => {
    try {
      const { data } = await api.post("/auth/google", {
        credential: response.credential,
      });
      login(data.token, data.user);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <p>Sign in with your Google account to continue.</p>
        <div className="login-button">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert("Google sign-in failed")}
          />
        </div>
        <Link to="/" className="back-link">← Back to home</Link>
      </div>
    </div>
  );
}

export default Login;