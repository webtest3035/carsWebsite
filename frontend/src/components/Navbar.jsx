import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🚗 <span className="brand-text">Cars Website</span>
      </Link>

      <div className="nav-center">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/products" className={linkClass}>Products</NavLink>
      </div>

      <div className="nav-right">
        {!user ? (
          <Link to="/login" className="login-btn">Login</Link>
        ) : (
          <div className={`user-menu ${open ? "open" : ""}`} ref={menuRef}>
            <button
              type="button"
              className="user-trigger"
              onClick={() => setOpen(!open)}
            >
              {user.picture ? (
                <img
                  src={user.picture}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="user-avatar"
                />
              ) : (
                <span className="user-avatar user-avatar-fallback">
                  {user.name?.[0]}
                </span>
              )}
              <span className="user-name">{user.name}</span>
            </button>

            <div className="dropdown">
              {user.role === "admin" && (
                <Link to="/admin" onClick={() => setOpen(false)}>
                  Admin panel
                </Link>
              )}
              <button type="button" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;