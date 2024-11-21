# Backend - Scheduling Platform API

This is the backend for the Scheduling Platform application, providing authentication, user registration, availability management, and appointment scheduling.

## Technologies Used:
- **Node.js** for server-side JavaScript
- **Express** for building RESTful APIs
- **SQLite3** as the database
- **bcrypt** for password hashing
- **jsonwebtoken (JWT)** for authentication
- **CORS** to allow cross-origin requests
- **dotenv** to manage environment variables

## Setup Instructions

### Prerequisites:
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### 1. Clone the repository:
Clone the project repository to your local machine.

```bash
git clone https://github.com/your-username/scheduling-platform-backend.git
cd scheduling-platform-backend
2. Install Dependencies:
Run the following command to install the required Node.js packages:

bash
Copy code
npm install
3. Set Up Database:
Ensure your SQLite database (database.db) is set up correctly with the necessary tables (Users, Availability, Appointments). You can manually create these tables in your SQLite database or use the provided SQL schema.

4. Environment Variables:
Create a .env file in the root directory and add your JWT secret key:

bash
Copy code
JWT_SECRET=your_secret_key_here
5. Run the Backend Server:
Start the backend server by running:

bash
Copy code
npm start
The server will run on http://localhost:5000 by default.

6. Testing the API:
You can test the API using Postman or any other API testing tool. Here are the available API endpoints:

POST /register: Register a new user.

Request body: { "name": "User", "email": "user@example.com", "password": "password123" }
Response: { "message": "Registration successful." }
POST /login: Log in an existing user and get a JWT token.

Request body: { "email": "user@example.com", "password": "password123" }
Response: { "token": "your_jwt_token_here" }
POST /set-availability: Set availability for the user.

Request body: { "token": "your_jwt_token", "startTime": "2024-11-22T09:00", "endTime": "2024-11-22T17:00" }
Response: { "message": "Availability set successfully." }
POST /schedule: Schedule an appointment.

Request body: { "userId": 1, "timeSlot": "2024-11-22T10:00", "bookedBy": "John Doe" }
Response: { "message": "Appointment scheduled successfully." }
7. Test the Application:
You can test the entire application by using the frontend with the backend running. Ensure the frontend makes requests to the correct backend URL (http://localhost:5000).


Deployed Link: https://etechback.onrender.com/