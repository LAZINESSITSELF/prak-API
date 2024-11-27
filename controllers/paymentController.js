import Payment from '../models/paymentModel.js';

export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addPayment = async (req, res) => {
    const payment = new Payment(req.body);
    try {
        await payment.save();
        res.status(201).json(payment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
