import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import CarCard from "../components/CarCard";

const features = [
    { icon: "🔍", title: "Detailed listings", text: "See price, year, fuel type, transmission and mileage for every car." },
    { icon: "💰", title: "Clear pricing", text: "Prices are shown upfront, so you can compare cars easily." },
    { icon: "⚡", title: "Always up to date", text: "Our team keeps the car list updated with current information." },
];

const steps = [
    "Browse our cars, no account needed",
    "Open any car to see its full details",
    "Sign in with Google when you're ready to buy",
];

function Home() {
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        api
            .get("/cars", { params: { page: 1, limit: 4 } })
            .then(({ data }) => setLatest(data.cars))
            .catch(() => { });
    }, []);

    return (
        <div>
            <section className="hero">
                <h1>Find the right car, all in one place</h1>
                <p> Explore our collection of cars with clear prices and full
                    specifications. </p>

            </section>

            {latest.length > 0 && (
                <section className="section">
                    <h2>Latest cars</h2>
                    <div className="cars-grid" style={{ marginTop: "24px" }}>
                        {latest.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))}
                    </div>
                    <p style={{ marginTop: "24px" }}>
                        <Link to="/products" className="back-link">View all cars →</Link>
                    </p>
                </section>
            )}

            <section className="section">
                <h2>Why Cars Website</h2>
                <div className="feature-grid">
                    {features.map((f) => (
                        <div className="feature-card" key={f.title}>
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section section-white">
                <h2>How it works</h2>
                <div className="steps">
                    {steps.map((text, i) => (
                        <div className="step" key={text}>
                            <span className="step-number">{i + 1}</span>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;