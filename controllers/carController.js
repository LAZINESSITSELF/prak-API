import Car from '../models/carModel.js';

// Controller untuk mendapatkan semua mobil
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller untuk menambah mobil baru
export const addCar = async (req, res) => {
    const car = new Car(req.body);
    try {
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
