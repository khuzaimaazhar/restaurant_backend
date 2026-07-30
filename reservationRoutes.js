const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Create reservation
router.post('/', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).json({ success: true, data: reservation });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json({ success: true, data: reservations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;