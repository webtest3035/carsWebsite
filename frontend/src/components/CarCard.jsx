import { Link } from "react-router-dom";

function CarCard({ car }) {
    return (

        <Link
            to={`/products/${car._id}`}
            className="car-link" style={{ textDecoration: "none", color: "inherit" }}
        >

            <div
                className="car-card"
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    width: "100%",
                    cursor: "pointer",
                }}
            >
                <img
                    src={car.image || "https://placehold.co/600x400?text=No+Image"}
                    alt={car.name}
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400?text=No+Image";
                    }}
                />
                <div style={{ padding: "12px" }}>
                    <h3 style={{ margin: "0 0 4px" }}>
                        {car.brand} {car.name}
                    </h3>
                    <p style={{ margin: "0 0 8px", fontWeight: "bold" }}>
                        {car.price != null
                            ? `₹${Number(car.price).toLocaleString("en-IN")}`
                            : "Price not available"}
                    </p>
                    <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                        {car.year} · {car.fuelType} · {car.transmission}
                        {car.mileage ? ` · ${car.mileage} km/l` : ""}
                    </p>
                    {car.description && (
                        <p style={{ fontSize: "14px" }}>{car.description}</p>
                    )}

                </div>
            </div>
        </Link>
    );
}

export default CarCard;