import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard,CarouselComp,FramerMotion } from "../components";
import { useSelector } from "react-redux";
import { error as errorMsg } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Carousel} from "@material-tailwind/react";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const errorMessage = useSelector((state) => state.auth.error);
  const [loading, setLoading] = useState(false);
  const dipatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
        setLoading(false);
      }
    });
  },[]);
  const error = () => {
    dipatch(errorMsg(""));
  };
  setTimeout(() => {
    dipatch(errorMsg(""));
  }, 10000);
  if (posts.length === 0) {
    return (
      <div className="w-full h-screen py-8 mt-4 text-center dark:bg-black">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              {loading && (
                <div className="w-full grid place-content-center mt-2">
                  <img
                    className="w-[30px]"
                    src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
                  />{" "}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <>
      {errorMessage && (
        <div
          className="mt-0.5 bg-red-500/10 border border-t-red-700 border-b-red-700 border-r-0 border-l-0 text-red-700 px-4 py-6  relative"
          role="alert"
        >
          <strong className="font-bold">
            Welcome{" "}
            <span className="text-white">{userData.name.toUpperCase()}</span> 👋
          </strong>
          <span className="block sm:inline">{errorMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-6">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              onClick={error}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <div className="py-4 md:py-8 w-full dark:bg-black">
        <Container>
          <div className=" flex items-center justify-center rounded-xl ">
            <div className="px-2 py-2 dark:bg-gray-900 rounded-xl bg-black/10">
              <Carousel className="h-[15rem] md:h-[28rem] w-full rounded-xl" autoplay  >
                {posts.slice(0, 5).map((randomPost) => (
                  <CarouselComp key={randomPost.$id} {...randomPost} />
                ))}
              </Carousel>
            </div>
          </div>
          <div className="flex flex-wrap">
            {posts
              .slice()
              .reverse()
              .map((post) => (
                <div key={post.$id} className="p-1 w-1/2 md:w-1/2 lg:w-1/2  ">
                  <PostCard {...post} />
                </div>
              ))}
          </div>
          <FramerMotion posts={posts}  />
        </Container>
      </div>
    </>
  );
}

export default Home;
