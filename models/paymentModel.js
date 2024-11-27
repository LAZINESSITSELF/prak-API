import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String }, // misalnya: "bank_transfer", "cash"
    status: { type: String, default: 'pending' },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
