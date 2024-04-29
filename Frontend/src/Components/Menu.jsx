import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import axios from 'axios'
import {URL} from "../Url"
import { Link, useNavigate } from 'react-router-dom'

const Menu = () => {

const {user}  = useContext(UserContext)
const {setuser} = useContext(UserContext)
const navigate = useNavigate()

const handleLogout= async()=>{
try{
 const res =  await axios.get(URL+"/api/auth/logout", {withCredentials: true})
//  console.log(res)
setuser(null)
navigate("/login")


}catch(err){
  console.log(err)
}

}


  return (
    <div className='bg-black w-[180px] z-10 flex- flex-col items-start absolute top-12 right-4 rounded-md p-4 space-y-4 md:right-32 '>

{!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to="/login">Login</Link></h3>}
{!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to="/register">Register</Link></h3>}
{user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to={"/profile/"+user._id}>Profile</Link></h3>}
{user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to="/write">Create Post</Link></h3>}
{user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to={"/myblogs/"+user._id}>MyBlogs</Link></h3>}
{user && <h3  onClick={handleLogout} className='text-white text-sm hover:text-gray-500 cursor-pointer'>Log Out</h3>}



    </div>
  )
}

export default Menu