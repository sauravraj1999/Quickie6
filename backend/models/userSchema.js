const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    level: {
        type: Number,
        default: 1,
    },
    results: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Results'
    },
    languages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
    },
    quizes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    role: {
        type: String,
        default: 'user'
    }
})

// Password hash
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password)
}

//Get jwt token 
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

module.exports = mongoose.model('User', userSchema)