import { useState } from "react";
import AdminCars from "../components/AdminCars";
import AdminUsers from "../components/AdminUsers";

function Admin() {
  const [tab, setTab] = useState("cars");

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <div className="tabs">
        <button
          className={tab === "cars" ? "tab active" : "tab"}
          onClick={() => setTab("cars")}
        >
          Cars
        </button>
        <button
          className={tab === "users" ? "tab active" : "tab"}
          onClick={() => setTab("users")}
        >
          Users
        </button>
      </div>

      {tab === "cars" ? <AdminCars /> : <AdminUsers />}
    </div>
  );
}

export default Admin;