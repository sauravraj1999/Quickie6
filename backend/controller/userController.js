const User = require('../models/userSchema');

//Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const preUser = await User.findOne({ email });

        if (preUser) {
            return res.status(401).json({ message: 'User already Exists on this email' })
        }

        const user = await User.create({
            name, email, password
        })

        res.status(200).json({ success: true, message: `User account created! ` })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//Login User 
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: 'User not found on this email' })
        }

        const isMatched = await user.comparePassword(password)
        if (!isMatched) {
            return res.status(401).json({ message: 'Please enter the valid credentials' })
        }

        const token = await user.getJWTToken()

        res.status(200).json({ message: 'User logged in successfully!', token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Load user
exports.loadUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(400).json({ message: 'User not found' })
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
