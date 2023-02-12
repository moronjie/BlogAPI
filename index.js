require('dotenv').config()
const express = require('express')
const connectDb = require('./models/connect')
const { default: mongoose } = require('mongoose')
const auth = require("./routes/auth")
const user = require("./routes/user")
const app = express()

app.use(express.json())
app.use('/auth', auth)
app.use('/user', user)

mongoose.set('strictQuery', true);

connectDb(process.env.dataBase)



mongoose.connection.on('error',(error)=>{
    console.log(error.message);
})

mongoose.connection.once('open',()=>{
    app.listen(process.env.Port, ()=>{
        console.log(`app listening at port ${process.env.Port}`);
    })
})