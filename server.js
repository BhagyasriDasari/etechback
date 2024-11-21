require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = process.env.JWT_SECRET; // Use the secret key from .env

app.get('/', (req, res) => {
    res.send('Welcome to the Scheduling Platform API!');
});

// Registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    db.run(
      `INSERT INTO Users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
      (err) => {
        if (err) return res.status(400).json({ error: "User already exists." });
        res.status(201).json({ message: "Registration successful." });
      }
    );
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM Users WHERE email = ?`, [email], async (err, user) => {
      if (err || !user) return res.status(400).json({ error: "Invalid credentials." });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(400).json({ error: "Invalid credentials." });

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    });
});

// Set Availability
app.post('/set-availability', (req, res) => {
    const { token, startTime, endTime } = req.body;

    try {
      const { id } = jwt.verify(token, SECRET_KEY);

      db.run(
        `INSERT INTO Availability (userId, startTime, endTime) VALUES (?, ?, ?)`,
        [id, startTime, endTime],
        (err) => {
          if (err) return res.status(400).json({ error: "Error setting availability." });
          res.json({ message: "Availability set successfully." });
        }
      );
    } catch {
      res.status(401).json({ error: "Unauthorized." });
    }
});

// Schedule Appointment
app.post('/schedule', (req, res) => {
    const { userId, timeSlot, bookedBy } = req.body;

    db.get(
      `SELECT * FROM Availability WHERE userId = ? AND startTime <= ? AND endTime >= ?`,
      [userId, timeSlot, timeSlot],
      (err, availability) => {
        if (err || !availability)
          return res.status(400).json({ error: "Slot unavailable." });

        db.run(
          `INSERT INTO Appointments (userId, timeSlot, bookedBy) VALUES (?, ?, ?)`,
          [userId, timeSlot, bookedBy],
          (err) => {
            if (err) return res.status(400).json({ error: "Error booking appointment." });
            res.json({ message: "Appointment scheduled successfully." });
          }
        );
      }
    );
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
