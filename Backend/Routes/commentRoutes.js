const express = require("express")
const router = express.Router()
const UserModel = require("../Models/usersModel")
const bcrypt = require("bcrypt")
const PostModel = require("../Models/postsModel")
const CommentModel = require("../Models/commentModel")
const verifyToken = require("../verifyToken")

//CREATE COMMENT

router.post("/create", verifyToken, async(req,res)=>{
    try{

const newcomment = new CommentModel(req.body)
await newcomment.save()
res.status(200).json(newcomment)


    }catch(err){
        res.status(200).json(err)
    }
})







//UPDATE COMMENT

router.put("/:id", verifyToken, async(req,res)=>{
    try{

const updateComment = await CommentModel.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true})
res.status(200).json( updateComment)

    }catch(err){
        res.status(500).json(err)
    }
})


//DELETE COMMENT

router.delete("/:id", verifyToken, async(req,res)=>{
    try{
        await CommentModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment has been deleted")


    }catch(err){
        res.status(200).json(err)
    }
})










//GET  POST COMMENTS


router.get("/post/:postId", async(req,res)=>{
    try{
        const Comments = await CommentModel.find({postId: req.params.postId})
        res.status(200).json(Comments)


    }catch(err){
        res.status(500).json(err)
    }
})




module.exports = router
