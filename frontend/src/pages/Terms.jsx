import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="legal-page">
      <Link to="/" className="back-link">← Back</Link>
      <h1>Terms &amp; Conditions</h1>
      <p>Last updated: {new Date().toLocaleDateString("en-IN")}</p>

      <h3>1. Use of the website</h3>
      <p>
        This website lets registered users browse car listings. You agree to use
        it only for lawful purposes and not to misuse or disrupt the service.
      </p>

      <h3>2. Accounts</h3>
      <p>
        You sign in using your Google account. You are responsible for activity
        under your account. We may suspend accounts that misuse the service.
      </p>

      <h3>3. Car information</h3>
      <p>
        Car details, prices and images are provided for information only and may
        change without notice. They do not form an offer or contract of sale.
      </p>

      <h3>4. Changes</h3>
      <p>We may update these terms from time to time. Continued use means you accept the updated terms.</p>

    </div>
  );
}

export default Terms;