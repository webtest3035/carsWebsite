import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const emptyForm = {
  name: "",
  brand: "",
  price: "",
  year: "",
  fuelType: "Petrol",
  transmission: "Manual",
  mileage: "",
  image: "",
  description: "",
};

function Admin() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchCars = async () => {
    try {
      const { data } = await api.get("/cars");
      setCars(data);
    } catch (err) {
      setMessage("Could not load cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (car) => {
    setEditingId(car._id);
    setForm({
      name: car.name || "",
      brand: car.brand || "",
      price: car.price ?? "",
      year: car.year ?? "",
      fuelType: car.fuelType || "Petrol",
      transmission: car.transmission || "Manual",
      mileage: car.mileage ?? "",
      image: car.image || "",
      description: car.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      ...form,
      price: Number(form.price),
      year: Number(form.year),
    };
    if (form.mileage === "") {
      delete payload.mileage;
    } else {
      payload.mileage = Number(form.mileage);
    }

    try {
      if (editingId) {
        await api.put(`/cars/${editingId}`, payload);
        setMessage("Car updated successfully");
      } else {
        await api.post("/cars", payload);
        setMessage("Car added successfully");
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchCars();

    }
    catch (err) {
      setMessage(err.response?.data?.message || "Failed to add car");
    }
    finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    try {
      await api.delete(`/cars/${id}`);
      setMessage("Car deleted");
      fetchCars();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete car");
    }
  };

  const inputStyle = { display: "block", width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Admin Panel</h1>
        <Link to="/products" className="back-page">← Back to products</Link>
      </div>

      {message && <p><b>{message}</b></p>}

      <h2>{editingId ? "Edit car" : "Add a car"}</h2>
      <form onSubmit={handleSubmit} className="car-form" >

        <input style={inputStyle} name="name" placeholder="Car name (e.g. Swift)" value={form.name} onChange={handleChange} required />

        <input style={inputStyle} name="brand" placeholder="Brand (e.g. Maruti Suzuki)" value={form.brand} onChange={handleChange} required />

        <input style={inputStyle} name="price" type="number" min="0" placeholder="Price in rupees" value={form.price} onChange={handleChange} required />

        <input style={inputStyle} name="year" type="number" placeholder="Year (e.g. 2023)" value={form.year} onChange={handleChange} required />

        <select style={inputStyle} name="fuelType" value={form.fuelType} onChange={handleChange}>
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Electric</option>
          <option>Hybrid</option>
          <option>CNG</option>
        </select>

        <select style={inputStyle} name="transmission" value={form.transmission} onChange={handleChange}>
          <option>Manual</option>
          <option>Automatic</option>
        </select>

        <input style={inputStyle} name="mileage" type="number" placeholder="Mileage in km/l (optional)" value={form.mileage} onChange={handleChange} />
        <input style={inputStyle} name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            style={{ width: "100%", maxHeight: "160px", objectFit: "cover", borderRadius: "6px", marginBottom: "10px" }}
            onError={(e) => (e.target.style.display = "none")}
            onLoad={(e) => (e.target.style.display = "block")}
          />
        )}
        <textarea style={inputStyle} name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : editingId ? "Update car" : "Add car"}
        </button>
        {editingId && (
          <button type="button" onClick={cancelEdit} style={{ marginLeft: "10px" }}>
            Cancel
          </button>)}
      </form>

      <h2 style={{ marginTop: "40px" }}>All cars ({cars.length})</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>{car.price != null ? `₹${Number(car.price).toLocaleString("en-IN")}` : "-"}</td>
              <td>{car.year}</td>
              <td>
                <button onClick={() => handleEdit(car)}>Edit</button>{" "}
                <button onClick={() => handleDelete(car._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;