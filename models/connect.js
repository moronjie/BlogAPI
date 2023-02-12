const mongoose = require("mongoose")

const connectDb = (url)=>{
    mongoose.connect(url),
    {useNewUrlParser: true}
}

module.exports = connectDb