require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { prisma } = require('../config/prisma');

// Sign Up Controller
const signUpController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // Check if admin already exists
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (admin) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = await prisma.admin.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            message: "Admin created successfully"
        });

    } catch (error) {
        console.error('Error in signUpController:', error);  // Log the error for debugging
        return next(error);
    }
}

// Login Controller
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Validate email format (optional but good practice)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // Find the admin by email
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            return res.status(400).json({
                message: "Admin does not exist"
            });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRY || '1d',
            algorithm: 'HS256'  // Explicitly set the algorithm
        });

        return res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error('Error in loginController:', error);  // Log the error
        return next(error);
    }
}

const logoutController = (req, res) => {
    // Clear the token cookie
    try {
        res.clearCookie('token');
        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        console.error('Error in logoutController:', error);  // Log the error
        return next(error);
    }
}

module.exports = {
    signUpController,
    loginController,
    logoutController
}
