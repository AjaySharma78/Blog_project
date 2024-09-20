import React from 'react'
import { useEffect } from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id,$createdAt,$updatedAt, title, featuredImage}) {
  const [formattedDate, setFormattedDate] = React.useState();

  useEffect(() => {
    const date = new Date($createdAt);
    const formatted = date.toLocaleDateString();
    setFormattedDate(formatted);
  }, [$createdAt]);
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-black/10 rounded-xl p-2 md:p-4 dark:bg-gray-900 dark:text-white '>
            <div className='w-full justify-center mb-4'>
            <div style={{ backgroundImage:`url(${appwriteService.getFilePreview(featuredImage)})`, backgroundSize: "cover",
                backgroundPosition: "center", 
                width: "100%",}} alt={title} className='rounded-xl h-[10rem] md:h-[15rem]' >
                  
                </div>
                 
            </div>
            <div className='w-full h-14 md:h-10 flex flex-wrap'> 
            <h2 className='w-full text-black dark:text-orange-500 text-sm md:text-lg'>{title}</h2>
            <h6 className='text-[10px] text-black/50 dark:text-orange-500/50 md:text-xs'>Ceated At : {formattedDate}</h6>
            </div>
        </div>
    </Link>
  )
}


export default PostCard