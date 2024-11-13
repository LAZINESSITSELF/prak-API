import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import carRoutes from "./api/cars.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Koneksi ke MongoDB Atlas tanpa opsi deprecated
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error("Failed to connect to MongoDB Atlas", error));

app.use("/api/cars", carRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});