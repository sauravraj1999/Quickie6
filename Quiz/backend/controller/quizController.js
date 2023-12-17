const Language = require("../models/language")
const Quiz = require("../models/quizSchema")
const Result = require("../models/resultModel")


//Create language 
exports.addLanguage = async (req, res) => {
    const { name } = req.body;
    try {
        const lang = await Language.create({ name });
        res.status(200).json({ messgae: 'Language added!', lang })
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//Create Quiz
exports.createQuiz = async (req, res) => {
    try {
        const { languageId, questions, name, description } = req.body;

        // Calculate maxMarks based on difficulty levels
        let maxMarks = 0;
        await questions.forEach(question => {
            if (question.difficultyLevel === 'beginner') {
                maxMarks += 2;
            } else if (question.difficultyLevel === 'intermediate') {
                maxMarks += 4;
            } else if (question.difficultyLevel === 'professional') {
                maxMarks += 6;
            }
        });

        // Create a new quiz
        const newQuiz = await Quiz.create({
            name,
            description,
            language: languageId,
            questions,
            maxMarks,
        });

        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get all quiz with sorting
exports.getAllQuiz = async (req, res) => {
    try {
        const { languageId } = req.query;
        let quizzes;

        if (languageId) {
            quizzes = await Quiz.find({ language: languageId }).populate('language', 'name');
        } else {
            quizzes = await Quiz.find({}).populate('language', 'name');
        }

        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Get all languages

exports.getAllLang = async (req, res) => {
    try {
        const language = await Language.find();
        res.status(200).json(language)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Submit the quiz 
exports.submitQuiz = async (req, res) => {
    try {
        const { quizId } = req.params; // Quiz if from params
        const { answers } = req.body; // req.body
        const userId = req.user;

        const existingResult = await Result.findOne({ quiz: quizId, user: userId });
        if (existingResult) {
            return res.status(400).json({ message: 'You have already completed this quiz' });
        }

        // Fetch the quiz by ID to calculate the score and difficulty levels
        const quiz = await Quiz.findById(quizId);

        let totalMarks = 0;
        const individualMarks = answers.map((answer, index) => {
            const question = quiz.questions[index];
            if (!question) {
                console.log(`Question at index ${index} not found in quiz`);
                return {
                    questionIndex: index,
                    selectedOptionIndex: answer.selectedOptionIndex,
                    marks: 0,
                    difficultyLevel: 'Not found',
                };
            }

            const isCorrect = question.correctOptionIndex === answer.selectedOptionIndex;
            // console.log(isCorrect);
            const difficultyLevelMarks = quiz.maxMarks[question.difficultyLevel];
            const marks = isCorrect ? difficultyLevelMarks : 0;
            // console.log(marks)
            totalMarks += marks;

            return {
                questionIndex: index,
                selectedOptionIndex: answer.selectedOptionIndex,
                marks,
                difficultyLevel: question.difficultyLevel,
            };
        });

        // Save the results to the database
        const newResult = await Result.create({
            quiz: quizId,
            user: userId,
            marksObtained: totalMarks,
            individualMarks,
        });

        return res.status(200).json({ message: 'Quiz submitted successfully', result: newResult });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//Get quiz
exports.getOneQuiz = async (req, res) => {
    try {
        //Checking exisiting user on time 
        const { quizId } = req.params;
        const userId = req.user;
        const existingPlayedUser = await Result.findOne({ quiz: quizId, user: userId })
        if (existingPlayedUser) {
            return res.status(400).json({ message: 'You already played this quiz, view your results' });
        }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found on this Id!' });
        }

        return res.status(200).json(quiz);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//get quiz per user
exports.getUserQuizResult = async (req, res) => {
    try {
        const { quizId } = req.params;
        const userId = req.user;
        const userQuizResult = await Result.findOne({ user: userId, quiz: quizId })
            .populate('quiz')
            .populate('user', '-password')

        if (!userQuizResult) {
            return res.status(404).json({ message: 'Result not found for this user and quiz.' });
        }

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        const maxMarks = quiz.maxMarks;
        let userMaxMarks = 0;

        userQuizResult.individualMarks.forEach(mark => {
            userMaxMarks += maxMarks[mark.difficultyLevel];
        });

        const userResultWithMaxMarks = {
            result: userQuizResult,
            quizTitle: quiz.name,
            maxMarks: maxMarks,
            userMaxMarks: userMaxMarks,
        };

        return res.status(200).json(userResultWithMaxMarks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};


// Get all results
exports.getAllQuizResults = async (req, res) => {
    try {
        const { language } = req.query;
        let results;

        if (language) {
            // Filter results based on the provided language ID
            results = await Result.find({
                quiz: {
                    $in: await Quiz.find({ language }).distinct('_id'),
                },
            })
                .populate('user', 'name')
                .populate('quiz', 'name language');
        } else {
            // Fetch all results when no language is provided
            results = await Result.find()
                .populate('user', 'name')
                .populate('quiz', 'name language');
        }

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Get user quiz for profile
exports.getUserResults = async (req, res) => {
    try {
        const userId = req.user; // Assuming userId is available in the request params
        const { language } = req.query; // Fetch language from query parameter

        let results;
        // console.log(language)
        if (language) {
            // Filter results based on the provided language ID
            results = await Result.find({
                user: userId, quiz: {
                    $in: await Quiz.find({ language }).distinct('_id'),
                },
            })
                .populate({
                    path: 'quiz',
                    match: { language }, // Filter quizzes by language
                    select: 'language', // Optionally select only the language field
                })
                .populate('user', 'name')
                .populate('quiz', 'name');

            // Filter out results where the quiz doesn't match the language
            results = results.filter((result) => result.quiz !== null);
        } else {
            // Fetch all results for the user when no language is provided
            results = await Result.find({ user: userId })
                .populate('user', 'name')
                .populate('quiz', 'name');
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete to reset progress
exports.deleteUserResult = async (req, res) => {
    try {
        const { resultId } = req.params; // Assuming userId and resultId are available in the request params
        const userId = req.user;
        // Find the result and check if it belongs to the specified user
        const result = await Result.findOne({ _id: resultId, user: userId });

        if (!result) {
            return res.status(404).json({ message: 'Result not found for this user.' });
        }

        // Delete the result
        await Result.findByIdAndDelete(resultId);

        res.status(200).json({ message: 'Result deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};