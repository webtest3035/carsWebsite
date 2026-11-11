import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import CarCard from "../components/CarCard";

function Products() {
    const { user, logout } = useAuth();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const { data } = await api.get("/cars");
                setCars(data);
            } catch (err) {
                setError("Could not load cars. Please log in again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <div>
                <h1>Our Cars</h1>
            </div>

            {loading && <p>Loading cars...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && cars.length === 0 && <p>No cars yet.</p>}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {cars.map((car) => (
                    <CarCard key={car._id} car={car} />
                ))}
            </div>
        </div>
    );
}

export default Products;