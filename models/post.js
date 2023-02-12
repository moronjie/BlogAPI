const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    desc:{
        type: String,
        require: true
    },
    photo:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    cartegory:{
        type: Array,
        require: true
    }
    

})

module.exports = mongoose.model("PostMOdel", PostSchema)