import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import {useSelector} from 'react-redux'
import {error as errorMsg} from '../store/authSlice'
import { useDispatch } from 'react-redux';
function Home() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);
    const errorMessage = useSelector((state) => state.auth.error);
    const dipatch = useDispatch();
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    const error = () => {
        dipatch(errorMsg(""));
    }
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center dark:bg-black">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold ">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (

        <>
            {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Welcome {userData.name}👋</strong>
  <span className="block sm:inline">{errorMessage}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={error} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>}
        <div className='py-8 w-full dark:bg-black'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full md:w-1/2 lg:w-1/4  '>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        </>
    )
}

export default Home