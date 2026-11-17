const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);


require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const carRoutes = require("./routes/carRoutes");
const userRoutes = require("./routes/userRoutes");
const testDriveRoutes = require("./routes/testDriveRoutes");

const app = express();

connectDB();

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test-drives", testDriveRoutes);

app.get("/", (req, res) => {
  res.send("Cars API is running");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));