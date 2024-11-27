import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    modelYear: { type: Number },
    pricePerDay: { type: Number, required: true },
    status: { type: String, default: 'available' },
    description: { type: String },
    image: { type: String }, // URL gambar
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

export default Car;
