const jwt = require("jsonwebtoken");
const User = require('../models/userSchema')

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('quiz_token')

        if (!token) {
            return res.status(401).json({ message: "Please Login to access the resource" })
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(data.id)
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }

}

module.exports = isAuthenticated;