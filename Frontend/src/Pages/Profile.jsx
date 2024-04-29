import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ProfilePosts from '../Components/ProfilePosts'
import axios from 'axios'
import {URL} from "../Url"
import { UserContext } from '../Context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'


const Profile = () => {

  const params = useParams().id
const [username, setusername] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const {user, setuser} = useContext(UserContext)
const navigate = useNavigate()
const [posts, setposts] = useState([])
const [updated, setupdated] = useState(false)

// console.log(user)

const fetchProfile = async()=>{
  try{

    const res = await axios.get(URL+"/api/users/"+user._id)
    setusername(res.data.username)
    setemail(res.data.email)
    setpassword(res.data.password)

  }catch(err){
    console.log(err)
  }
}


const handleUserUpdate = async()=>{
  setupdated(false)
  try{

const res = await axios.put(URL+"/api/users/"+user._id,{username, email, password}, {withCredentials:true})
// console.log(res.data)
setupdated(true)

  }catch(err){
    console.log(err)
  setupdated(false)

  }

}


const handleUserDelete = async()=>{
  try{

    const res = await axios.delete(URL+"/api/users/"+user._id, {withCredentials:true})
// console.log(res.data)
setuser(null)
navigate("/")

  }catch(err){
    console.log(err)
  }
}

// console.log(user)
const fetchuserpost = async()=>{
  try{

const res = await axios.get(URL+"/api/posts/user/"+user._id)
// console.log(res.data)
setposts(res.data)


  }catch(err){
    console.log(err)
  }
}


useEffect(()=>{
  fetchuserpost()
},[params])


useEffect(()=>{
  fetchProfile()
},[params])


  return (
    <div className='maindiv'>
<Navbar/>

<div className=' flex px-8 md:px-[200px] mt-8  md:flex-row flex-col-reverse md:items-start items-start' >
{/* bg-blue-200  */}

<div className="leftdiv flex flex-col w-full  md:w-[70%]  mt-8 space-y-2 md:mt-0  ">
{/* bg-red-200 */}
    <h1 className='text-xl font-bold mb-5'>Your Posts:</h1>
{posts?.map((p)=>(
  <ProfilePosts key={p._id} p={p}/>
))}

</div>


<div className="rightdiv md:sticky md:top-12 rounded flex justify-start md:justify-end items-start  w-full md:w-[30%]  py-1  md:items-end bg-black px-5  ">

  <div className="rightdiv2box   flex flex-col space-y-4 items-start ">


  <h1 className='text-xl font-bold mb-4 text-white'>Profile</h1>
<input onChange={(e)=> setusername(e.target.value)} value={username} className='outline-none px-4 py-2 text-gray-500  rounded'  type="text"  placeholder='Your Username' />
<input onChange={(e)=> setemail(e.target.value)} value={email} className='outline-none px-4 py-2 text-gray-500 rounded'  type="email" placeholder='Your Email' />
{/* <input onChange={(e)=> setpassword(e.target.value)} value={password} className='outline-none px-4 py-2 text-gray-500 rounded'  type="password" placeholder='Your Password'  /> */}

<div className="btnsdiv flex items-center space-x-4 mt-8">
    <button onClick={handleUserUpdate} className='bg-white text-black rounded px-4 py-2  font-semibold cursor-pointer hover:text-black hover:bg-gray-200 mb-2 '>Update</button>
    <button onClick={handleUserDelete} className='bg-white text-black rounded px-4 py-2 font-semibold cursor-pointer hover:text-black hover:bg-gray-200 mb-2'>Delete</button>

</div>

{updated && <h3 className='text-green-500 text-sm text-center mt-4'>User Updated Successfully!</h3>}
  </div>




</div>


</div>








    <Footer/>


    </div>
   
  )
}

export default Profile