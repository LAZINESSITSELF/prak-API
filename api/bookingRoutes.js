import express from 'express';
import Booking from '../models/bookingModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId').populate('carId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:userId', async (req,res)=>{
    const {userId}=req.params;
    try{
        const bookings = await Booking.find({ userId }).populate('userId').populate('carId')
        res.status(200).json(bookings)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

export default router;
