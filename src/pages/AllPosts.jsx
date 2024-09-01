import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux'
function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const userData = useSelector((state) => state.auth.userData);

useEffect(() => {
      if (!userData) {
        console.log('User data is not available yet.');
        return;
      }
       setLoading(true);
      appwriteService.getPosts([]).then((post) => {
        const postMap = new Map();

        post.documents.forEach((post) => {
            if (!postMap.has(post.userId)) {
                postMap.set(post.userId, []);
            }
            postMap.get(post.userId).push(post);
        });

        const isAuthor = postMap.has(userData.$id);
        if (isAuthor) {
          setPosts(post.documents);
        } else {
          const activePosts = post.documents.filter((post) => post.status === 'active');
          setPosts(activePosts);
        }
        setLoading(false);
      }).catch((error) => {
        console.error('Error fetching posts:', error);
      });
    }, [userData]);


 
  return (
    <div className='py-8 w-full dark:bg-black'>
          {loading && (
          <div className="w-full h-screen flex justify-center items-start mt-2">
            <img
              className="w-[30px]"
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            />{" "}
          </div>
        )}
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full md:w-1/2 lg:w-1/4 '>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts