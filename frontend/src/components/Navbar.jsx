import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "#1f2937",
        color: "white",
      }}
    >
      <Link to="/products" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>
        🚗 Cars Website
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link to="/products" style={{ color: "white" }}>Products</Link>

        {user?.role === "admin" && (
          <Link to="/admin" style={{ color: "white" }}>Admin panel</Link>
        )}

        {user?.picture && (
          <img
            src={user.picture}
            alt={user.name}
            referrerPolicy="no-referrer"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
        )}
        <span>{user?.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;