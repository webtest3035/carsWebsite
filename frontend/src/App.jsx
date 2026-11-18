import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import CarDetails from "./pages/CarDetails";
import Admin from "./pages/Admin";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookTestDrive from "./pages/BookTestDrive";
import MyTestDrives from "./pages/MyTestDrives";

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<CarDetails />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/book-test-drive/:id"
            element={
              <ProtectedRoute>
                <BookTestDrive />
              </ProtectedRoute>
            }
          />

          <Route path="/my-test-drives"
            element={
              <ProtectedRoute>
                <MyTestDrives />
              </ProtectedRoute>
            }
          />
        </Routes>

      </main>
      <Footer />
    </div>
  );
}

export default App;