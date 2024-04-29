import React, { useContext, useEffect, useState } from 'react'
import HomePosts from "../Components/HomePosts"
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import {URL} from "../Url"
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import Loader from "../Components/Loader"
import { UserContext } from '../Context/UserContext'

const Home = () => {

  const {search} = useLocation()
  // console.log(search)
const [posts, setposts] = useState([])
const [noResults, setnoResults] = useState(false)
const [loader, setloader] = useState(false)
const {user} = useContext(UserContext )
// console.log(user)



const fetchpost = async()=>{
  setloader(true)
  try{
const res = await axios.get (URL+"/api/posts/"+search)
// console.log(res.data)
setposts(res.data)
if(res.data.length === 0){
  setnoResults(true)
}else{
  setnoResults(false)
}
setloader(false)

  }catch(err){
    console.log(err)
setloader(true)

  }
}

useEffect(()=>{
  fetchpost()
}, [search])




  return (

    <>
    <Navbar/>
    
    <div className='px-8 md:px-[200px] min-h-[80vh]'>

{loader? <div className='h-[40vh] flex justify-center items-center'><Loader/></div>:!noResults?posts.map((post)=>(

  <>
  <Link to={user?`/posts/post/${post._id}`:"/login"}>
<HomePosts key={post._id} post={post}/>
</Link>
  </>

  // this is for agar user hai to he post details dikhe wrna vo login page pr chla jaaye
)): <h3 className='text-center  text-xl font-bold mt-16'>No Post Available </h3>}

</div>
<Footer/>
    
    </>

   
  )
}

export default Home