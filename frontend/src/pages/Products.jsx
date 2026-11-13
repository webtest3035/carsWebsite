import { useEffect, useState } from "react";
import api from "../api/axios";
import CarCard from "../components/CarCard";

const PAGE_SIZE = 12;

function Products() {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("/cars", {
          params: { page, limit: PAGE_SIZE },
        });
        setCars(data.cars);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("Could not load cars. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div style={{ padding: "20px 0" }}>
      <h1 style={{ textAlign: "center" }}>Our Cars</h1>

      {loading && <p style={{ textAlign: "center" }}>Loading cars...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading && !error && cars.length === 0 && (
        <p style={{ textAlign: "center" }}>No cars yet.</p>
      )}

      {!loading && (
        <div className="cars-grid">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1 || loading}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages || loading}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;