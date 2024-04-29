const express = require("express")
const router = express.Router()
const UserModel = require("../Models/usersModel")
const bcrypt = require("bcrypt")
const PostModel = require("../Models/postsModel")
const CommentModel = require("../Models/commentModel")
const verifyToken = require("../verifyToken")

//CREATE POST

router.post("/create", verifyToken, async(req,res)=>{
    try{

const newpost = new PostModel(req.body)
await newpost.save()
res.status(200).json(newpost)


    }catch(err){
        res.status(200).json(err)
    }
})







//UPDATE POST

router.put("/:id", verifyToken, async(req,res)=>{
    try{

const updatePost = await PostModel.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true})
res.status(200).json( updatePost)

    }catch(err){
        res.status(500).json(err)
    }
})


//DELETE POST

router.delete("/:id", verifyToken, async(req,res)=>{
    try{
        await PostModel.findByIdAndDelete(req.params.id)
        await CommentModel.deleteMany({postId: req.params.id})
        res.status(200).json("Post has been deleted")


    }catch(err){
        res.status(200).json(err)
    }
})


//GET POST DETAILS


router.get("/:id", async(req,res)=>{
    try{
        const Post = await PostModel.findById(req.params.id)
        res.status(200).json(Post)


    }catch(err){
        res.status(200).json(err)
    }
})



//GET  ALL POSTS


router.get("/", async(req,res)=>{ 
    const query = req.query
 console.log(query)
    
    try{
        const searchFilter = {
                title:{$regex:query.search, $options:"i"}
        }
        const Posts = await PostModel.find(query.search?searchFilter: null)
        res.status(200).json(Posts)


    }catch(err){
        res.status(200).json(err)
    }
})



//GET  USERS POSTS


router.get("/user/:userId", async(req,res)=>{
    try{
        const Posts = await PostModel.find({userId: req.params.userId})
        res.status(200).json(Posts)


    }catch(err){
        res.status(200).json(err)
    }
})







module.exports = router
