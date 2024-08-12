import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  // console.log(appwriteService.getFilePreview(featuredImage));
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 dark:bg-slate-800 dark:text-white '>
            <div className='w-full justify-center mb-4'>
            <div style={{ backgroundImage:`url(${appwriteService.getFilePreview(featuredImage)})`, backgroundSize: "cover",
                backgroundPosition: "center", height: "15rem",
                width: "100%",}} alt={title} className='rounded-xl' ></div>
                 
            </div>
            <div
            className='w-full h-12 flex flex-wrap'
            >
              
            <h3 >{title}</h3>
              </div>
        </div>
    </Link>
  )
}


export default PostCard