const jwt = require('jsonwebtoken');
const { prisma } = require('../config/prisma');

const authenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: "Please pass header token in the API"
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

        // Find the admin in the database
        const user = await prisma.admin.findUnique({ where: { id } });
        if (!user) {
            return res.status(401).json({
                message: "No user found for the token"
            });
        }

        // Attach user to request and proceed to the next middleware
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token or Session Expired",
            error: error.message
        });
    }
}

module.exports = {
    authenticated
}
