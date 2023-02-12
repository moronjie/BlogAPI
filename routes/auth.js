const express = require('express')
const user = require('../models/user')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post("/register",async(req,res)=>{
    const {username, password, email, profile} = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await user.create({
            username: username,
            password: hashPassword,
            email: email,
            profile: profile
        })

        res.status(200).json(newUser)
        
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
})

router.post("/login",async(req,res)=>{
    
    try {
        const createdUser = await user.findOne({username: req.body.username})
        !createdUser && res.status(404).json({msg: `account does not exit`})

        const validationOfPassword = await bcrypt.compare(req.body.password, createdUser.password )

        !validationOfPassword && res.status(400).json({msg: `wrong password`})
       
        const {password, ...other} = createdUser._doc

        res.status(200).json(other)
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
})

module.exports = router