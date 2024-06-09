const express = require('express');
const cors = require('cors'); // Import the cors middleware
const router = express.Router();
const AuthController = require('../controllers/AuthController');

const app = express(); // Create Express app
app.use(cors()); // Apply CORS middleware to all routes

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshtoken);

module.exports = router;