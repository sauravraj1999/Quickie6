const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const { registerUser, loginUser, loadUser } = require('../controller/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(isAuthenticated, loadUser);

module.exports = router;