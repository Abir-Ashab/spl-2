const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during registration' });
    }
};

const login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                
                if (result) {
                    let token = jwt.sign({ name: user.name }, 'secretValue', { expiresIn: '30s' });
                    let refreshToken = jwt.sign({ name: user.name }, 'rfreshvalue', { expiresIn: '48h' });
                    return res.status(200).json({
                        message: 'Login success',
                        token,
                        refreshToken
                    });
                } else {
                    return res.status(401).json({ message: 'Password does not match' });
                }
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

const refreshtoken = (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken, 'rfreshvalue', function(err, decode) {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            let token = jwt.sign({ name: decode.name }, 'thesecrettoken', { expiresIn: '60s' });
            let refreshToken = req.body.refreshToken;
            return res.status(200).json({
                message: 'Token refreshed successfully!',
                token,
                refreshToken
            });
        }
    });
};

module.exports = {
    register,
    login,
    refreshtoken
};
