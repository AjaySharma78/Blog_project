import React from "react";
import { Button, Container } from "../components";
import image from "../assets/terms.png";
import authService from "../appwrite/auth"
import {useNavigate} from 'react-router-dom'
import { set } from "react-hook-form";

function Verify() {
   const [errorMessage, setError] = React.useState("");
   const navigate = useNavigate()
   const [loading, setLoading] = React.useState(false);

   const verifyEmail = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    try {
     setLoading(true);
     const response = await authService.verifyEmail(userId, secret);
     if(response){
      setLoading(false);
       alert("Email verified successfully");
       navigate("/")
     }
     
    } catch (error) {
      console.log("Verify :: error", error);
      if(error){
        setError("User with the requested ID could not be found.Looks like the link is invalid or expired. Please try again after login .");
      }

   }
  }
  const error = () => {
    setError("");
  }

  return (
    <>
  {errorMessage && <div className="mt-0.5 bg-red-500/10 border border-t-red-700 border-b-red-700 border-r-0 border-l-0 text-red-700 px-4 py-6  relative" role="alert">
  <span className="block sm:inline">{errorMessage}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-6">
    <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={error} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>}
    <div>
      <Container className="h-screen flex flex-wrap justify-center items-center ">
        <div className="bg-stone-950 p-5 rounded-lg border">
        {loading && (
          <div className="w-full grid place-content-center mt-2">
            <img
              className="w-[30px]"
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            />{" "}
          </div>
        )}
          <div>
            <img src={image} alt="image" width="500px" />
          </div>
          <div className="flex flex-wrap justify-center ">
            <Button className="bg-orange-400 w-2/4 py-1 md:py-2  hover:bg-orange-500 rounded-md text-center" onClick={verifyEmail} >
              Verify Email
            </Button>
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}

export default Verify;
