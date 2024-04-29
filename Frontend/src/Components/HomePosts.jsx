import React from 'react'
import {IF} from "../Url"

const HomePosts = ({post}) => {
  return (
    <div className='w-full flex mt-8 space-x-8 px-4 bg-gray-200 rounded  py-2'>

      <div className='leftdiv w-[35%] bg-red-200 h-[200px] flex justify-center items-center rounded'>
<img src={IF+post.photo} alt="" className='w-full h-full rounded object-cover' />
        
      </div>

      <div className="rightdiv w-[65%] flex flex-col ">

      <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'>
  {post.title}</h1>

<p className='description text-sm md:text-lg '>{post.desc.slice(0,200)+" ...Read More"} </p>

<div className='bg-white rounded flex flex-col items-end  mb-2 text-sm font-semibold text-gray-500  md:mb-4 px-2 mt-4'>

<div className="creatornamediv">
<span className='text-black'>Creator Name:</span> <span className='ml-1'>@{post.username}</span>     
</div>

<div className='date&time flex space-x-2 text-sm '>
  <span className='text-black'>Date & Time:</span><p>{ new Date(post.updatedAt).toString().slice(0,15)}</p>
  <p>{ new Date(post.updatedAt).toString().slice(16,24)}</p>
</div>


</div>

      </div>


    </div>
  )
}

export default HomePosts