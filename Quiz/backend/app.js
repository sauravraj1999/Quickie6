const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: 'backend/db/config.env' }) // Using .env 


app.use(express.json()); //Json data can be used to work and exchange
app.use(cors());// For interacting with api

const user = require('./routes/userRoutes')
const quiz = require('./routes/quizRoutes')
app.use('/api', user)
app.use('/api', quiz)

module.exports = app;