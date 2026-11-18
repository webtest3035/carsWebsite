import { useEffect, useState } from "react";
import api from "../api/axios";

const STATUSES = ["pending", "contacted", "completed", "cancelled"];

function AdminTestDrives() {
  const [drives, setDrives] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/test-drives")
      .then(({ data }) => setDrives(data))
      .catch(() => setError("Could not load test drives"))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/test-drives/${id}`, { status });
      setDrives((prev) =>
        prev.map((d) => (d._id === id ? { ...d, status } : d))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Could not update status");
    }
  };

  if (loading) return <p>Loading test drives...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const visible =
    filter === "all" ? drives : drives.filter((d) => d.status === filter);

  const pendingCount = drives.filter((d) => d.status === "pending").length;

  return (
    <div style={{ padding: "20px 0" }}>
      <div className="drives-header">
        <h2 style={{ margin: 0 }}>
          Test drives ({visible.length})
          {pendingCount > 0 && (
            <span className="pending-badge">{pendingCount} pending</span>
          )}
        </h2>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p>No test drive requests found.</p>
      ) : (
        <div className="table-scroll">
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>Requested</th>
                <th>Car</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Preferred date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((d) => (
                <tr key={d._id}>
                  <td>{new Date(d.createdAt).toLocaleDateString("en-IN")}</td>
                  <td>
                    {d.car ? `${d.car.brand} ${d.car.name}` : "(car deleted)"}
                  </td>
                  <td>{d.name}</td>
                  <td>
                    <a href={`tel:${d.phone}`}>{d.phone}</a>
                  </td>
                  <td>{d.email}</td>
                  <td>
                    {d.preferredDate
                      ? new Date(d.preferredDate).toLocaleDateString("en-IN")
                      : "-"}
                  </td>
                  <td>
                    <select
                      className={`status status-${d.status}`}
                      value={d.status}
                      onChange={(e) =>
                        handleStatusChange(d._id, e.target.value)
                      }
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminTestDrives;