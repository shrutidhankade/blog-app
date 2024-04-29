const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const cookieParser = require("cookie-parser")
const authRoute = require("./Routes/auth")
const userRoute = require("./Routes/usersRoute")
const postRoute = require("./Routes/postsRoute")
const commentRoute = require("./Routes/commentRoutes")




const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB)
        console.log("database connected")
    }catch(err){
        console.log(err)
    }
}

//middlewares
dotenv.config()
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute )
app.use("/api/users",userRoute )
app.use("/api/posts",postRoute )
app.use("/api/comments",commentRoute  )


//Image upload

const storage = multer.diskStorage({
    destination:(req,file, fn)=>{
        fn(null, "images")
    },

    filename:(req,file,fn)=>{
        fn(null, req.body.img)
        // fn(null, "akshitaimg.jpg")
    }
})

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("image is uploaded successfully")

})



app.listen(process.env.PORT, ()=>{
    connectDB()
    console.log("app is running on port "+process.env.PORT)
})