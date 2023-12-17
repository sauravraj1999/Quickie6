const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const { addLanguage, createQuiz, getAllQuiz, getAllLang, submitQuiz, getOneQuiz, getUserQuizResult, getAllQuizResults, getUserResults, deleteUserResult } = require('../controller/quizController');

router.route('/addLanguage').post(addLanguage);
router.route('/addQuiz').post(createQuiz);

router.route('/getAllQuiz').get(getAllQuiz);
router.route('/getAllLan').get(getAllLang);

router.route('/quiz/:quizId/submit').post(isAuthenticated, submitQuiz);
router.route('/quiz/:quizId').get(isAuthenticated, getOneQuiz);
router.route('/result/quiz/:quizId').get(isAuthenticated, getUserQuizResult);

router.route('/leaderboard').get(getAllQuizResults);
router.route('/user/results').get(isAuthenticated, getUserResults);
router.route('/user/result/:resultId/delete').delete(isAuthenticated, deleteUserResult);



module.exports = router;