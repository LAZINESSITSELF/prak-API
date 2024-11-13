import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/car';

dotenv.config();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'GET') {
        try {
            const cars = await Car.find();
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
