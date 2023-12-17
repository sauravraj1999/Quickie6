const app = require('./app')
const connectToMongo = require('./db/db')
require('dotenv').config({ path: 'backend/db/config.env' })


const port = process.env.PORT || 5000
//Staring mongodb server
connectToMongo()

//Staring app
app.listen(port, () => {
    console.log(`Server running on port ${port} `)
})