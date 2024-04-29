const express = require("express")
const router = express.Router()
const UserModel = require("../Models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//REGISTER

router.post("/register", async(req,res)=>{
    try{
        const {username, email, password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hashSync(password, salt)
        const newuser = new UserModel({username, email, password:hashpassword})
        await newuser.save()
        res.status(200).json(newuser)

    }catch(err){
        res.status(500).json(err)
      
    }
})

//LOGIN

router.post("/login", async(req,res)=>{
    try{

const user = await UserModel.findOne({email: req.body.email})
if(!user){
    return res.status(404).json("User not found with this email address!")
}

const matchpassword = await bcrypt.compareSync(req.body.password, user.password)
if(!matchpassword){
    return res.status(401).json("Wrong Credentials")
}

const JWTtoken = jwt.sign({_id: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"})
const {password,...info} = user._doc
res.cookie("token", JWTtoken).status(200).json(info)


    }catch(err){
        console.log(err)
    }
})

//LOGOUT

router.get("/logout", async(req,res)=>{
    try{
         res.clearCookie("token", {samesite: "none", secure: true}).status(200).send("user logged out successfully")

    }catch(err){
        res.status(500).json(err)
    }
})


//REFETCH ROUTE

router.get("/refetch", (req,res)=>{
    const token = req.cookies.token
    jwt.verify(token, process.env.JWT_SECRET,{}, async(err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)

    })
})








module.exports = router