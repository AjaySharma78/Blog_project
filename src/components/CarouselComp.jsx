import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Typography} from "@material-tailwind/react";

function CarouselComp({$id,featuredImage,title}) {
  return (
   
       <Link key={$id} to={`/post/${$id}`}>
                    <div className="h-[15rem] md:h-[28rem] relative w-full rounded-xl">
                      <img
                        src={appwriteService.getFilePreview(
                          featuredImage
                        )}
                        alt={title}
                        className="h-full w-full object-cover rounded-xl "
                      />
                      <div className="absolute inset-0 flex items-center pl-16 h-full w-full  bg-black/50 rounded-xl">
                        <div className="w-full md:w-4/6">
                          <Typography
                            variant="h1"
                            color="white"
                            className="mb-4 text-xl md:text-5xl lg:text-6xl"
                          >
                            {title}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Link>
  )
}

export default CarouselComp
