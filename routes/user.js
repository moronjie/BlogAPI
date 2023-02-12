const express = require('express')
const user = require('../models/user')
const post = require("../models/post")
const bcrypt = require("bcrypt")

const router = express.Router()

router.get("/", async (req,res)=>{
    try {
        const allUsers = await user.find()
        res.status(200).json(allUsers)
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
})

router.get("/:id", async (req,res)=>{
    try {
        const singUser = await user.findOne({_id : req.params.id})
        res.status(200).json(singUser)
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
})

router.put("/:id", async (req, res)=>{
    try {
        const userToUpdate = await user.findOne({_id : req.params.id})
        if(userToUpdate._id === req.params.id){
            if(req.body.password){
                await bcrypt.hash(req.body.password, 10)
            }
        }
        const update = await user.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{
            new:true
        })
        res.status(200).json(update)
    } catch (err) {
        res.status(500).json(({msg: err.err}))
    }
})

router.delete("/:id", async (req, res)=>{
    try {
        const DeleteUser = await user.find({_id: req.params.id})
        await post.findOneAndDelete({username: DeleteUser.username})

    } catch (err) {
        
    }
})

module.exports = router