import { Router } from "express";
import Car from "../models/car.js";
import multer from "multer";
import fs from "fs"; // Pastikan fs diimpor untuk menghapus file gambar

const router = Router();

// Setup multer untuk menyimpan file gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Pastikan folder uploads ada
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// GET semua mobil
router.get("/", async (req, res) => {
    try {
        const cars = await Car.find(); // Menggunakan Car.find() untuk mengambil semua mobil
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const cars = await Car.findById(req.params.id);
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST untuk menambahkan mobil baru
router.post("/", upload.single("image"), async (req, res) => {
    const car = new Car({
        name: req.body.name,
        brand: req.body.brand,
        available: req.body.available,
        pricePerDay: req.body.pricePerDay,
        imagePath: req.file ? `/uploads/${req.file.filename}` : null,
    });

    try {
        const newCar = await car.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH untuk mengupdate mobil berdasarkan ID
router.patch("/:id", upload.single("image"), async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: "Car not found" });

        if (req.body.name != null) car.name = req.body.name;
        if (req.body.brand != null) car.brand = req.body.brand;
        if (req.body.available != null) car.available = req.body.available;
        if (req.body.pricePerDay != null) car.pricePerDay = req.body.pricePerDay;

        if (req.file) {
            if (car.imagePath) {
                fs.unlink("." + car.imagePath, (err) => {
                    if (err) console.error("Error deleting old image:", err);
                });
            }
            car.imagePath = `/uploads/${req.file.filename}`;
        }

        const updatedCar = await car.save();
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE untuk menghapus mobil berdasarkan ID
router.delete("/:id", async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id); // Menggunakan Car.findByIdAndDelete()
        if (!car) return res.status(404).json({ message: "Car not found" });
        res.status(200).json({ message: "Car deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;