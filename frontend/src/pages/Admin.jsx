import { useState } from "react";
import AdminCars from "../components/AdminCars";
import AdminUsers from "../components/AdminUsers";
import AdminTestDrives from "../components/AdminTestDrives";

const TABS = [
  { key: "cars", label: "Cars" },
  { key: "users", label: "Users" },
  { key: "drives", label: "Test drives" },
];

function Admin() {
  const [tab, setTab] = useState("cars");

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={tab === t.key ? "tab active" : "tab"}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "cars" && <AdminCars />}
      {tab === "users" && <AdminUsers />}
      {tab === "drives" && <AdminTestDrives />}
    </div>
  );
}

export default Admin;