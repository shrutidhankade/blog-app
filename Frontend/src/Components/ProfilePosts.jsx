import React from 'react'
import {IF} from "../Url"

const ProfilePosts = ({p}) => {
  return (

    <div className='w-full flex mt-8 space-x-8 px-4   bg-gray-200  py-2'>

      <div className='leftdiv w-[35%] bg-red-200 h-[180px] flex justify-center items-center rounded'>
<img src={IF+p.photo} alt="" className='w-full h-full rounded object-cover' />
        
      </div>

      <div className="rightdiv w-[65%] flex flex-col ">

      <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'>
  {p.title}</h1>

<p className='description text-sm md:text-lg '>{p.desc}</p>

<div className='flex flex-col items-end  mb-2    text-sm font-semibold text-gray-500  md:mb-4 px-2 mt-2 '>

<div className="creatornamediv">
<span className='text-black'>Creator Name:</span> <span className='ml-1'>@{p.username}</span>     
</div>

<div className='date&time flex space-x-2'>
  <span className='text-black'>Date & Time:</span><p>{new Date(p.updatedAt).toString().slice(0,15)}</p>
  <p>{ new Date(p.updatedAt).toString().slice(16,24)}</p>
</div>


</div>

      </div>


    </div>






  )
}

export default ProfilePosts