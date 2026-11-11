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
        <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
            <Link to="/products">← Back to products</Link>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", marginTop: "20px", }} >
                <img
                    src={car.image || "https://placehold.co/600x400?text=No+Image"}
                    alt={car.name}
                    style={{ width: "100%", maxWidth: "480px", borderRadius: "10px", objectFit: "cover", }} />

                <div style={{ flex: 1, minWidth: "260px" }}>
                    <h1 style={{ marginTop: 0 }}>
                        {car.brand} {car.name}
                    </h1>
                    <h2 style={{ color: "#16a34a" }}>{price}</h2>

                    <table style={{ borderCollapse: "collapse", width: "100%" }}>
                        <tbody>
                            {rows.map(([label, value]) => (
                                <tr key={label}>
                                    <td style={{ padding: "8px", color: "#555", width: "40%" }}>
                                        {label}
                                    </td>
                                    <td style={{ padding: "8px", fontWeight: "600" }}>
                                        {value}
                                    </td>
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
                </div>
            </div>
        </div>
    );
}

export default CarDetails;