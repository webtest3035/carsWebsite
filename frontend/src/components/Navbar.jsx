import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/products" className="navbar-brand">
        🚗 Cars Website
      </Link>

      <div
        className={`user-menu ${open ? "open" : ""}`}
        ref={menuRef}
      >
        <button
          type="button"
          className="user-trigger"
          onClick={() => setOpen(!open)}
        >
          {user?.picture ? (
            <img
              src={user.picture}
              alt=""
              referrerPolicy="no-referrer"
              className="user-avatar"
            />
          ) : (
            <span className="user-avatar user-avatar-fallback">
              {user?.name?.[0]}
            </span>
          )}
          <span className="user-name">{user?.name}</span>
        </button>

        <div className="dropdown">
          {user?.role === "admin" && (
            <Link to="/admin" onClick={() => setOpen(false)}>
              Admin panel
            </Link>
          )}
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;