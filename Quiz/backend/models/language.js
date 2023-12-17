const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
