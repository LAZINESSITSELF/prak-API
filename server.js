import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './api/userRoutes.js';
import carRoutes from './api/carRoutes.js';
import paymentRoutes from './api/paymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/payments', paymentRoutes);

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(`Database connection error: ${err}`));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
