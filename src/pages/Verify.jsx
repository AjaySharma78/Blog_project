import React from "react";
import { Button, Container } from "../components";
import image from "../assets/terms.png";
import authService from "../appwrite/auth"
import {useNavigate} from 'react-router-dom'

function Verify() {
   const navigate = useNavigate()
   const verifyEmail = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    try {
     const response = await authService.verifyEmail(userId, secret);
     if(response){
       alert("Email verified successfully");
       navigate("/")
     }
     
    } catch (error) {
      console.log("Verify :: error", error);
    

   }
  }

  return (
    <div>
      <Container className="h-screen flex flex-wrap justify-center items-center ">
        <div className="bg-stone-950 p-5 rounded-lg border">
          <div>
            <img src={image} alt="image" width="500px" />
          </div>
          <div className="flex flex-wrap justify-center ">
            <Button className="bg-orange-400 w-2/4 hover:bg-orange-500 rounded-md text-center" onClick={verifyEmail} >
              Verify Email
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Verify;
