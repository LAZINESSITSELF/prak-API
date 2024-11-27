import express from 'express';
import Booking from '../models/bookingModel.js';

const router = express.Router();

// Create a booking
router.post('/', async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId').populate('carId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
