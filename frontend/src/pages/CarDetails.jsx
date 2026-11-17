import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await api.get(`/cars/${id}`);
                setCar(data);
            }
            catch (err) {
                setError(err.response?.data?.message || "Could not load car");
            }
            finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
    if (error) {
        return (
            <div style={{ padding: "20px" }}>
                <p style={{ color: "red" }}>{error}</p>
                <Link to="/products">Back to products</Link>
            </div>
        );
    }

    const price =
        car.price != null
            ? `₹${Number(car.price).toLocaleString("en-IN")}`
            : "Price not available";

    const rows = [
        ["Brand", car.brand],
        ["Model", car.name],
        ["Year", car.year],
        ["Fuel type", car.fuelType],
        ["Transmission", car.transmission],
        ["Mileage", car.mileage ? `${car.mileage} km/l` : null],
    ].filter(([, value]) => value);

    return (
        <div className="details-page">
            <Link to="/products" className="back-link">← Back to products</Link>

            <div className="details-layout">
                <div className="details-image-box">
                    <img
                        src={car.image || "https://placehold.co/600x400?text=No+Image"}
                        alt={car.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400?text=No+Image";
                        }}
                    />
                </div>

                <div className="details-info">
                    <h1 style={{ marginTop: 0 }}>
                        {car.brand} {car.name}
                    </h1>
                    <h2 className="details-price">{price}</h2>

                    <table className="details-table">
                        <tbody>
                            {rows.map(([label, value]) => (
                                <tr key={label}>
                                    <td className="details-label">{label}</td>
                                    <td className="details-value">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {car.description && (
                        <>
                            <h3>Description</h3>
                            <p>{car.description}</p>
                        </>
                    )}

                    <Link to={`/book-test-drive/${car._id}`} className="btn-link" style={{ marginTop: "16px" }}>
                        Book a test drive
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CarDetails;