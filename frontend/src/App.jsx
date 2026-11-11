import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import CarDetails from "./pages/CarDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route path="/products" element={
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      } />

      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <CarDetails />
          </ProtectedRoute>
        }
      />

      <Route path="/admin" element={
        <ProtectedRoute adminOnly>
          <Admin />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;