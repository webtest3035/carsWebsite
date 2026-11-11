import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      const { data } = await api.post("/auth/google", {
        credential: response.credential,
      });

      login(data.token, data.user);
      navigate("/products");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Cars Website</h1>
      <p>Sign in to see our cars</p>
      <div style={{ display: "inline-block" }}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert("Google sign-in failed")}
        />
      </div>
    </div>
  );
}

export default Login;