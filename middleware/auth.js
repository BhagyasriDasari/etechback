const jwt = require('jsonwebtoken');
require('dotenv').config(); // To use environment variables from .env file

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; // Retrieve token from Authorization header
    if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' });

    const actualToken = token.split(' ')[1]; // If token format is 'Bearer <token>'
    jwt.verify(actualToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token.' });
        req.user = user; 
        next(); 
    });
};

module.exports = { authenticateToken };
