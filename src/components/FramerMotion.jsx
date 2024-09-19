import React from "react";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
function FramerMotion({ posts }) {
  const block = {
    animation: "appear linear",
    animationTimeline: "view()",
    animationRange: "entry 0% cover 30%",
  };
  const getrandompost = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  const randomPost = getrandompost(posts);
 
  return (
    <>
      <div className="rounded-2xl w-full flex justify-center items-center origin-bottom">
        <div className="w-full z-10">
          <div
            style={block}
            className="rounded-2xl block h-[80vh] md:h-screen w-full sticky top-0 -z-10 origin-bottom "
          >
            <img
              className="rounded-2xl object-cover text-black dark:text-white  w-full h-full "
              src={appwriteService.getFilePreview(randomPost.featuredImage)}
              alt={randomPost.title}
            />
          </div>
          {/* <div className='h-screen w-full relative'></div> */}
          <div className=" h-[80vh] md:h-screen bg-white/60 dark:bg-black/70 rounded-2xl ">
            <div className="h-[80vh] md:h-screen w-full overflow-y-hidden ">
              <div className="browser-css overflow-y-auto h-screen  custom-scrollbar">
                <h1 className="text-2xl  font-bold sticky top-0 p-5 text-black rounded-t-md bg-white dark:bg-black dark:text-white">{randomPost.title}</h1>
                <div className="text-left text-sm md:text-lg px-1 md:px-10 text-black dark:text-gray-300 ">{parse(randomPost.content)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FramerMotion;
