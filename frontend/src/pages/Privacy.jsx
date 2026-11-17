import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="legal-page">
      <Link to="/" className="back-link">← Back</Link>
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString("en-IN")}</p>

      <h3>What we collect</h3>
      <p>
        When you sign in with Google, we receive your name, email address and
        profile picture. We do not receive your Google password.
      </p>

      <h3>How we use it</h3>
      <p>
        We use this information only to create your account, identify you when
        you return, and show your name in the website.
      </p>

      <h3>Storage and sharing</h3>
      <p>
        Your details are stored in our database. We do not sell or share your
        personal information with third parties, except where required by law.
      </p>

    </div>
  );
}

export default Privacy;