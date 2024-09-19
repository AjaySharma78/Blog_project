import React from 'react'
import authService from '../appwrite/auth';
import { Button, Container, Input, Logo } from '../components';
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();
    const [errorMessage, setError] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    async function updatePassword() {
      setLoading(true);
        if(password !== confirmPassword){
          setError("Password and confirm password should be same")
          setLoading(false);
            return;
        }
        if(!password || !confirmPassword){
          setError("Please enter password and confirm password")
          setLoading(false);
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const secret = urlParams.get('secret');
        const userId = urlParams.get('userId');
        try {
            const response = await authService.updatePassword(userId,secret,password,confirmPassword);
            if(response){
              setLoading(false);
              setSuccessMessage("Password updated successfully.You will be redirected to login page in second");
              setTimeout(() => {
                navigate("/login");
              }, 2500);
            }
        } catch (error) {
          setLoading(false);
          setError("User with the requested ID could not be found.Looks like the link is invalid or expired. Please try again.") 
        } finally {
          setLoading(false);
        }


    }
    const error = () => {
        setError("");
        setSuccessMessage("");
      }
      setTimeout(() => {
        error()
      }, 5000);
    
  return (
    <>
     {errorMessage && <div className="w-full mt-0.5 bg-red-500/10 border border-t-red-700 border-b-red-700 border-r-0 border-l-0 text-red-700 px-4 py-6 absolute" role="alert">
  <span className="block sm:inline">{errorMessage}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-6">
    <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={error} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>}
{successMessage && (
        <div
          className="w-full mt-0.5 bg-green-500/10 border border-t-green-700 border-b-green-700 border-r-0 border-l-0 text-green-700 px-4 py-6  absolute"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-6">
            <svg
              className="fill-current h-6 w-6 text-green-500"
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
    <Container className=" w-full md:w-[40%]  h-screen flex flex-wrap justify-center items-center" >
      <div className="bg-gray-100 dark:bg-gray-900 p-5 rounded-lg border">

        <div className="flex flex-wrap justify-center ">
        <div className="mb-2 flex justify-center items-center flex-col">
        <span className=" flex justify-center w-full max-w-[200px]">
          <Logo width="70px" />
        </span>
        <h1 className="text-2xl font-bold text-center dark:text-white text-black">Update Password</h1>
      </div>
          <Input
              label="Enter new password"
              placeholder="New password"
              type="password"
              name="new password"
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}
              />
               <Input
              label="Confirm password"
              placeholder="Confirm password"
              type="password"
              name="confirm password"
              value={confirmPassword} 
              onChange={(e)=>setConfirmPassword(e.target.value)}
              />
          <Button className="bg-orange-400  py-1 md:py-2  mt-4 hover:bg-orange-500 rounded-md text-center" onClick={updatePassword}>
            {loading ? "Loading..." : "Update Password"}
          </Button>
        </div>
      </div>
    </Container>
       </>
  )
}

export default ResetPassword
