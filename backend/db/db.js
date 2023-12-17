const mongoose = require('mongoose')


const connectToMongo = () => {
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`server connected to  ${data.connection.host}`)
    }
    ).catch((error) => {
        console.log(error)
    })
}

module.exports = connectToMongo;