import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function MyTestDrives() {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/test-drives/my")
      .then(({ data }) => setDrives(data))
      .catch(() => setError("Could not load your test drives"))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this test drive request?")) return;
    try {
      await api.patch(`/test-drives/my/${id}/cancel`);
      setDrives((prev) =>
        prev.map((d) => (d._id === id ? { ...d, status: "cancelled" } : d))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Could not cancel");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div className="my-drives-page">
      <h1>My test drives</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && drives.length === 0 && (
        <div className="empty-box">
          <p>You haven't booked any test drives yet.</p>
          <Link to="/products" className="btn-link">Browse cars</Link>
        </div>
      )}

      {drives.map((d) => (
        <div className="drive-card" key={d._id}>
          <img
            src={d.car?.image || "https://placehold.co/600x400?text=No+Image"}
            alt=""
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x400?text=No+Image";
            }}
          />

          <div className="drive-info">
            <h3 style={{ margin: "0 0 4px" }}>
              {d.car ? `${d.car.brand} ${d.car.name}` : "Car no longer available"}
            </h3>
            <p className="drive-meta">
              Requested on {new Date(d.createdAt).toLocaleDateString("en-IN")}
            </p>
            <p className="drive-meta">
              Preferred date:{" "}
              {d.preferredDate
                ? new Date(d.preferredDate).toLocaleDateString("en-IN")
                : "Not specified"}
            </p>
            <p className="drive-meta">Contact: {d.phone}</p>
          </div>

          <div className="drive-side">
            <span className={`status-pill status-${d.status}`}>{d.status}</span>
            {d.status === "pending" && (
              <button className="cancel-btn" onClick={() => handleCancel(d._id)}>
                Cancel
              </button>
            )}
            {d.car && (
              <Link to={`/products/${d.car._id}`} className="back-link">
                View car
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyTestDrives;