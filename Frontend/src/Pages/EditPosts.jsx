import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { ImCross } from "react-icons/im";
import axios from 'axios';
import {URL} from "../Url"
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const EditPosts = () => {

  const postId = useParams().id
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

const [title, setTitle] = useState("")
const [desc, setdesc] = useState("")
const [file, setFile] = useState(null)
const [category, setcategory] = useState("")
const [categories, setcategories] = useState([])
  // this is for categories array


  const fetchPost = async()=>{
    try{
      const res = await axios.get(URL+"/api/posts/"+postId)
      setTitle(res.data.title)
      setdesc(res.data.desc)
      setFile(res.data.photo)
      setcategories(res.data.categories)


    }catch(err){
      console.log(err)
    }

  }


const handleUpdate = async(e)=>{
  e.preventDefault()

  const post = {
    title, 
    desc,
    username:user.username, 
    userId: user._id,
    categories: categories  
  
  }
  if(file){
    const data = new FormData()
    const filename = Date.now()+file.name
    data.append("img", filename)
    data.append("file",file)
    post.photo = filename
    // console.log(data)
  
  
    try{
      const imgupload = await axios.post(URL+"/api/upload", data)
      // console.log(imgupload.data)
    
    }catch(err){
      console.log(err)
    } 
  
  }
  
  //post upload
  // console.log(post)
  try{
  const res = await axios.put(URL+"/api/posts/"+postId, post, {withCredentials: true})
  navigate("/posts/post/"+res.data._id)
  // console.log(res.data)
  
  
  }catch(err){  
    console.log(err)
  }

}



  useEffect(()=>{
    fetchPost()
  }, [postId])





const addCategory = ()=>{

  let updatedcategories = [...categories]
  updatedcategories.push(category)
  setcategory("")
  setcategories(updatedcategories)
}

const deleteCategory = (i)=>{
   let updatedcategories = [...categories]
   updatedcategories.splice(i)
  setcategories(updatedcategories)

}









  return (
    <div >
    <Navbar/>
    
    <div className='px-6 md:px-[200px] mt-8'>
    <h1 className='font-bold md:text-2xl text-xl '>Update Post</h1>    
    
    <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
    <input onChange={(e)=> setTitle(e.target.value)} value={title} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none border border-black '/>
    <input  onChange={(e)=> setFile(e.target.files[0])} type="file" className='px-4 py-2 rounded border border-black'/>
    
    <div className='flex flex-col'>
    
    <div className='flex items-center space-x-4 md:space-x-8 '>
    <input  value={category} onChange={(e)=> setcategory(e.target.value)} className='px-4 py-2 outline-none rounded border border-black' placeholder='Enter post category' type='text'/>
    <div  onClick={addCategory} className="btndiv bg-black text-white rounded px-6 py-2 font-semibold cursor-pointer">ADD</div>
    </div>
    
    
    {/* categoriesdiv */}
    <div className='categorydiv  flex px-4 mt-3 '>
    
    {categories?.map((c, i)=>(
      
      <div  key={i} className='categoryname flex items-center justify-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
        <p>{c}</p>
    <p onClick={()=> deleteCategory(i)}  className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
    
    </div>
      ))}
    
    
    
    
    
    
    </div>
    
    
    </div>
    
    <textarea  onChange={(e)=> setdesc(e.target.value)}  value={desc} className='px-4 py-2 outline-none rounded border border-black' id="" cols={30} rows={8} placeholder='Enter post description'></textarea>
    
    <button onClick={handleUpdate} className='bg-black w-full md:w-[20% ] mx-auto text-white font-semibold rounded px-4 py-2 md:text-xl text-lg'>Update</button>
    
    </form>   
    
    </div>
    
    
    
    
    
    
    
    
    
    <Footer/>
    
    
        </div>
  )
}

export default EditPosts