const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    description: {
        require: true,
        type: String
    },
    language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
    questions: [{
        questionText: String,
        options: [String],
        correctOptionIndex: Number,
        difficultyLevel: {
            type: String,
            enum: ['beginner', 'intermediate', 'professional'],
            default: 'beginner',
        },
    }],
    maxMarks: {
        beginner: { type: Number, default: 2 },
        intermediate: { type: Number, default: 4 },
        professional: { type: Number, default: 6 },
    },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
