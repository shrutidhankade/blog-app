import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Comment from "../Components/Comment"
import { BiEdit } from "react-icons/bi";
import { MdDelete, MdTurnedIn } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {URL, IF} from "../Url"
import { UserContext } from '../Context/UserContext';
import Loader from "../Components/Loader"

const PostDetails = () => {

const postId = useParams().id
// console.log(postId)
const [post, setpost] = useState({})
const {user }  = useContext(UserContext)
const [comments, setcomments] = useState([])
const [comment, setcomment] = useState("")
const [loader, setloader] = useState(false)
const navigate = useNavigate()


const fetchPost = async()=>{
  setloader(true)
  try{  

    const res = await axios.get(URL+"/api/posts/"+postId)
    // console.log(res.data)
    setpost(res.data)
    setloader(false)

  }catch(err){
    console.log(err)
  setloader(true)

  }
}


const handleDeletePost = async()=>{
  try{
    const res = await axios.delete(URL+"/api/posts/"+postId, {withCredentials:true})
    console.log(res.data)
    navigate("/")

  }catch(err){
    console.log(err)
  }
}


useEffect(()=>{
  fetchPost()
},[postId])


const fetchPostComments = async()=>{
  try{

    const res = await axios.get(URL+"/api/comments/post/"+postId)
    setcomments(res.data)

  }catch(err){
    console.log(err)
  }
}


useEffect(()=>{
  fetchPostComments()
},[postId])


const postComment = async(e)=>{
e.preventDefault()
try{

  const res = await axios.post(URL+"/api/comments/create", {comment:comment, author:user.username, postId:postId, userId:user._id}, {withCredentials:true})
  // fetchPostComments()
  // setcomment("")
  window.location.reload(true)
  // console.log(res.data)

}catch(err){
  console.log(err)
}

}



  return (
  <div className='maindiv h-full'>

<Navbar/>

{loader?<div className='h-[80vh] flex justify-center items-center w-full'><Loader/></div>:<div className='px-8 md:px-[200px] mt-8 bg-slate-200 '>

<div className='titlediv flex justify-between items-center'>
    <h1 className='text-2xl font-bold text-black md:text-3xl '>
    {post.title}
    </h1>
{user?._id === post?.userId && <div className='btndiv flex items-center justify-center space-x-2'>
<p className='text-xl cursor-pointer' onClick={()=>navigate("/edit/"+postId)}><BiEdit /></p>
<p className='text-xl cursor-pointer'  onClick={handleDeletePost}><MdDelete /> </p>
    </div> }
    

</div>

<div className='flex items-center justify-between mt-2 md:mt-4 '>
<p>@{post.username}</p>
<div className='date&time flex space-x-2'>
  <span>Date & Time:</span><p>{ new Date(post.updatedAt).toString().slice(0,15)}</p>
  <p>{ new Date(post.updatedAt).toString().slice(16,24)}</p>
</div>

</div>

<img src={IF+post.photo} alt="" className='w-full h-[65vh] mx-auto rounded-lg mt-8' />

<p className='postdescription mx-auto mt-8'>{post.desc}</p>

<div className='categorydiv flex items-center mt-8 space-x-4 font-semibold '>
<p>Categories:</p>

<div className='categories flex justify-center items-center space-x-2'>
{post.categories?.map((c,i)=>(
<>
<h1 key={i} className='bg-white rounded-lg px-3 py-1'>{c}</h1>

</>
  
))}

</div>


</div>

{/* comment */}
<div className='commentsection flex flex-col mt-4 bg-white rounded px-5'>
<h3 className='mt-6 mb-4 font-semibold'>Comments:</h3>
{comments?.map((c)=>(
<Comment key={c._id} c={c} post={post}/>
))}



</div>

{/* write a comment */}
<div className=' w-full flex flex-col mt-4 md:flex-row   '>
  <input  onChange={(e)=> setcomment(e.target.value)} type="text" placeholder='Write a Comment!' className='md:w-[80%] outline-none border-2 border-black rounded px-4 py-2 mt-4 md:mt-0' />
  <button  onClick={postComment} className='bg-black text-white text-sm px-2 py-2 ml-2 rounded md:w-[20%] mt-4 md:mt-0'>Add Comment</button>
</div>



</div>}
<Footer/>
 </div>
  )
} 

export default PostDetails