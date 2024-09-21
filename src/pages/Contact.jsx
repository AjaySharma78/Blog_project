import React from "react";
function Contact() {
  return (
    <>
    <div className="relative flex items-top justify-center min-h-[400px] dark:bg-black sm:items-center sm:pt-0">
      <div className="w-full mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 mx-2 w-full bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
              <h1 className="text-3xl sm:text-4xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                Get in touch:
              </h1>
              {/* <p className="text-normal text-lg sm:text-xl font-medium dark:text-white text-gray-600 mt-2">
                Fill in the form to start a conversation
              </p> */}

              <div className="flex items-center mt-8 text-gray-600 dark:text-white">
                <i className="fa-solid fa-location-dot"></i>
                <div className=" text-md tracking-wide font-semibold w-40">
                  Biratnagar,Nepal
                </div>
              </div>

              <div className="flex items-center mt-4 text-gray-600 dark:text-white">
                <i className="fa-solid fa-phone"></i>
                <div className=" text-md tracking-wide font-semibold w-40">
                  +977 9827373796
                </div>
              </div>

              <div className="flex items-center mt-2 text-gray-600 dark:text-white">
                <i className="fa-solid fa-envelope"></i>
                <div className=" text-md tracking-wide font-semibold w-40">
                  aakirtsharma123@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contact;
