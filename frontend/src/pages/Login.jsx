import { GoogleLogin } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: "🔍",
    title: "Detailed listings",
    text: "See price, year, fuel type, transmission and mileage for every car.",
  },
  {
    icon: "🔒",
    title: "Safe sign-in",
    text: "Sign in with your Google account. We never see your password.",
  },
  {
    icon: "⚡",
    title: "Always up to date",
    text: "Our team keeps the car list updated so you see current information.",
  },
];

const steps = [
  "Sign in with your Google account",
  "Browse all available cars",
  "Open any car to see its full details",
];

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/products" replace />;
  }

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

  const signInButton = (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => alert("Google sign-in failed")}
    />
  );

  return (
    <div>

      <header className="landing-header">
        <strong>🚗 Cars Website</strong>
      </header>

      <section className="hero">
        <h1>Find the right car, all in one place</h1>
        <p>
          Explore our collection of cars with clear prices and full
          specifications. Sign in to start browsing.
        </p>
        <div className="hero-button">{signInButton}</div>
        <small>Free to use. Sign in with Google in one click.</small>
      </section>

      <section className="section">
        <h2>Why use Cars Website</h2>
        <div className="feature-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-white">
        <h2>How it works</h2>
        <div className="steps">
          {steps.map((text, i) => (
            <div className="step" key={text}>
              <span className="step-number">{i + 1}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section cta">
        <h2>Ready to see the cars?</h2>
        <div className="hero-button">{signInButton}</div>
      </section>
    </div>
  );
}

export default Login;