const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    marksObtained: {
        type: Number
    },
    individualMarks: [{
        questionIndex: Number,
        selectedOptionIndex: Number,
        marks: { type: Number, default: 0 },
        difficultyLevel: String,
    }],
    timestamp: { type: Date, default: Date.now },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;

