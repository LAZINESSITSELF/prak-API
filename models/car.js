import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    available: { type: Boolean, default: true },
    pricePerDay: { type: Number, required: true },
    imagePath: { type: String },
}, {
    timestamps: true,
});

const Car = mongoose.model("Car", carSchema);

export default Car;