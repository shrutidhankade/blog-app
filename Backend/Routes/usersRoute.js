const express = require("express")
const router = express.Router()
const UserModel = require("../Models/usersModel")
const bcrypt = require("bcrypt")
const PostModel = require("../Models/postsModel")
const CommentModel = require("../Models/commentModel")
const  verifyToken = require("../verifyToken")

//UPDATE

router.put("/:id",  verifyToken, async(req,res)=>{
    try{
if(req.body.password){
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hashSync(req.body.password, salt)
}

const updateUser = await UserModel.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true})
res.status(200).json(updateUser)



    }catch(err){
        res.status(500).json(err)
    }
})


//DELETE

router.delete("/:id",  verifyToken, async(req,res)=>{
    try{
        await UserModel.findByIdAndDelete(req.params.id)
        await PostModel.deleteMany({userId: req.params.id})
        await CommentModel.deleteMany({userId: req.params.id})
        res.status(200).json("user has been deleted")


    }catch(err){
        res.status(200).json(err)
    }
})


//GET USER


router.get("/:id", async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.id)
        const {password, ...info} = user._doc
        res.status(200).json(info)


    }catch(err){
        res.status(200).json(err)
    }
})


module.exports = router
