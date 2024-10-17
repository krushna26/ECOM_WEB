require('dotenv').config();
const User = require('../Model/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SecretKey = process.env.KEY;

const Register = async (req, res) => {   
    try {
        const errors = validationResult(req);       
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation Error',
                errors: errors.array()
            });
        } 
        
        const { username, email, password } = req.body; // Destructure from request body
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ email });
         
        if (existingUser) {
            return res.status(400).json({
                success: false,
                msg: 'User already registered'
            });
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            cartitems: []
        });
        
        await newUser.save();
        return res.status(201).json({
            success: true,
            msg: "New user added successfully!"
        });

    } catch (error) {
        console.error("Error in Register:", error);
        return res.status(500).json({
            success: false,
            msg: "Server Error"
        });
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure from request body       
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(401).json({
                success: false,
                msg: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                msg: "Invalid email or password"
            });
        }

        if (!SecretKey) {
            return res.status(500).json({
                success: false,
                msg: "Server error: Secret key not defined"
            });
        }

        const token = jwt.sign({ id: userData._id, email: userData.email }, SecretKey, { expiresIn: "1h" });

        return res.status(200).json({
            success: true,
            msg: "Logged in successfully",
            token: token
        });

    } catch (error) {
        console.error("Error in Login:", error);
        return res.status(500).json({
            success: false,
            msg: "Server Error"
        });
    }
}

module.exports = {
    Register,
    Login
}
