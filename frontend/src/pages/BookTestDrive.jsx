import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function BookTestDrive() {
  const { id } = useParams();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    preferredDate: "",
  });

  useEffect(() => {
    api
      .get(`/cars/${id}`)
      .then(({ data }) => setCar(data))
      .catch(() => setError("Could not load this car"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/test-drives", { carId: id, ...form });
      setDone(true);
      window.scrollTo({ top: 0 });
    } catch (err) {
      setError(err.response?.data?.message || "Could not book test drive");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  if (!car) {
    return (
      <div className="booking-page">
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/products" className="back-link">← Back to products</Link>
      </div>
    );
  }

  const price =
    car.price != null ? `₹${Number(car.price).toLocaleString("en-IN")}` : "";

  if (done) {
    return (
      <div className="booking-page">
        <div className="success-box">
          <div className="success-icon">✓</div>
          <h2>Test drive request received</h2>
          <p>
            Your test drive for the <b>{car.brand} {car.name}</b> is confirmed.
            Our team will reach you as soon as possible on <b>{form.phone}</b>.
          </p>
          <Link to="/products" className="btn-link">Browse more cars</Link>
          <Link to="/my-test-drives" className="btn-link" style={{ marginRight: "10px" }}>
            View my test drives
          </Link>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="booking-page">
      <Link to={`/products/${id}`} className="back-link">← Back to car</Link>
      <h1>Book a test drive</h1>

      <div className="booking-car">
        <img
          src={car.image || "https://placehold.co/600x400?text=No+Image"}
          alt={car.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400?text=No+Image";
          }}
        />
        <div>
          <h3 style={{ margin: "0 0 4px" }}>{car.brand} {car.name}</h3>
          <p style={{ margin: "0 0 6px", fontWeight: "bold" }}>{price}</p>
          <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
            {car.year} · {car.fuelType} · {car.transmission}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <label>Full name</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Phone number</label>
        <input
          name="phone"
          type="tel"
          placeholder="10-digit mobile number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />

        <label>Preferred date (optional)</label>
        <input
          name="preferredDate"
          type="date"
          min={today}
          value={form.preferredDate}
          onChange={handleChange}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Submitting..." : "Confirm test drive"}
        </button>
      </form>
    </div>
  );
}

export default BookTestDrive;