import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>🚗 Cars Website</strong>
          <p>Browse and compare cars in one place.</p>
        </div>

        <div className="footer-links">
          <Link to="/terms">Terms &amp; Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Cars Website. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;