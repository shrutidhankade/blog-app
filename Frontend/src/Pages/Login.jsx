import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from "../Components/Footer"
import axios from "axios"
import {URL} from "../Url"
import { UserContext } from '../Context/UserContext'

const Login = () => {

const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const [error, seterror] = useState(false)
const {setuser} = useContext(UserContext)
const navigate = useNavigate()



const handleLogin = async()=>{
  try{
    const res = await axios.post(URL+"/api/auth/login", {email,password}, {withCredentials:true})
    // console.log(res.data)
    setuser(res.data)
    navigate("/")

  }catch(err){
    seterror(true)
    console.log(err)
  }
}

  return (

    <>  
 <div className='flex items-center justify-between px-6 md:px-[200px] py-4 '>
        
   <h1 className='text-2xl md:text-xl font-extrabold'><Link to="/">BlogVista</Link> </h1>
        <h3 className='bg-black text-white rounded px-4 py-2  font-semibold cursor-pointer hover:text-black hover:bg-gray-300 mb-2 '> <Link to="/register">  Register</Link> </h3>
        </div>
    
    
    <div className='w-full flex  h-[100vh]  '>

<div className="leftdiv w-[50%] h-[80vh] bg-blue-200">
    <img src="https://img.lovepik.com/photo/45009/7677.jpg_wh860.jpg" alt="" className='h-full w-full' />
</div>


<div className=' rightdiv w-[50%] h-full  space-y-6 py-5 flex flex-col items-center justify-center'>
<h1 className='text-xl font-bold text-center'>LogIn to your account!</h1>

<input  onChange={(e)=> setemail(e.target.value)}   type="email" placeholder='Enter Your Email' className='w-[70%] px-4 py-2 border-2 border-black outline-0 rounded' />
<input onChange={(e)=> setpassword(e.target.value)}    type="password" placeholder='Enter Your Password' className='w-[70%] px-4 py-2 border-2 border-black outline-0 rounded ' />
<button   onClick={handleLogin} className='w-[30%] px-4 py-3 text-xl font-bold text-white bg-black rounded-lg hover:bg-gray-400 hover:text-black'>Log In</button>
{error &&  <h3 className='text-red-500 text-sm'>Something Went Wrong</h3>}

<div className='flex items-center justify-center space-x-3'>
<p>New Here?</p>
<p className='text-blue-500 font-bold hover:text-red-500'><Link to="/register">Register Yourself</Link></p>
</div>


</div>

</div>
    
  <Footer/>
    </>
   
  )
}

export default Login