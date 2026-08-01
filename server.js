const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

console.log('MONGODB_URI from env:', process.env.MONGODB_URI);

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());
app.use(express.json());

// Import routes
const reservationRoutes = require('./routes/reservationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Use routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/feedback', feedbackRoutes);

// Test route
app.get('/', (req, res) => {
    res.send(' 9O\'9 Restaurant API is running!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log(' Connected to MongoDB Atlas'))
    .catch(err => console.error(' MongoDB connection error:', err.message));

// Start server
/* const PORT = 5001;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
}); */
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
