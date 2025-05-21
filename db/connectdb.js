const mongoose = require('mongoose')

const local_url = 'mongodb://127.0.0.1:27017/taskAPI'
const live_URL = 'mongodb+srv://chacha45454:ram123@cluster0.edlqo.mongodb.net/reactProductsAPI?retryWrites=true&w=majority&appName=Cluster0'

const connectdb = () => {
    return mongoose.connect(live_URL)
        .then(() => {
            console.log('Data-base connected!')
        })
        .catch(() => {
            console.log(error)

        })
}

module.exports = connectdb