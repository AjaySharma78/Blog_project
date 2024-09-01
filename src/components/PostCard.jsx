import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  // console.log(appwriteService.getFilePreview(featuredImage));
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-black/10 rounded-xl p-4 dark:bg-gray-900 dark:text-white '>
            <div className='w-full justify-center mb-4'>
            <div style={{ backgroundImage:`url(${appwriteService.getFilePreview(featuredImage)})`, backgroundSize: "cover",
                backgroundPosition: "center", 
                width: "100%",}} alt={title} className='rounded-xl h-[10rem] md:h-[15rem]' >
                  
                </div>
                 
            </div>
            <div
            className='w-full h-7 md:h-10 flex flex-wrap'
            >
              
            <h2 className='text-sm md:text-lg'>{title}</h2>
              </div>
        </div>
    </Link>
  )
}


export default PostCard