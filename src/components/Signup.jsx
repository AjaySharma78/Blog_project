import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import github from '../assets/github.png'
import google from '../assets/google.png'
import { error as errorMsg } from "../store/authSlice";

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit,formState} = useForm()
  const { errors } = formState;
    const create = async(data) => {
        setError("");
        setLoading(true);
        try {
            const response = await authService.createAccount(data)
            if (response) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login({userData}));
                if(!userData.emailVerification){
                    await authService.emailVerification();
                    dispatch(errorMsg("Email has been send! Please verify your email address"));
                }
                navigate("/")

            }
        } catch (error) {
            setError(error.message)
        }finally {
            setLoading(false);
          }

    }

  return (
    <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-11/12 md:w-full max-w-lg bg-gray-100 rounded-xl p-5 md:p-10 border border-black/10 dark:bg-stone-950 dark:border-white`}>
            <div className="mb-2 flex justify-center">
                    <span className=" flex justify-center items-center w-full max-w-[100px]">
                        <Logo width="70px" />
                    </span>
                </div>
                <h2 className="text-center text-xl font-bold leading-tight dark:text-white">Sign up to create account</h2>
                <p className="mt-2 text-center text-sm text-black/60 dark:text-white/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium transition-all duration-200 hover:underline dark:text-white"
                    >
                        Sign In
                    </Link>
                </p>
                {loading && (
          <div className="w-full grid place-content-center mt-2">
            <img
              className="w-[30px]"
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            />
          </div>
        )}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-5 md:mt-0" >
                    <div className='space-y-5'>
                        <Input
                        label="Username: "
                        mess={errors.name && errors.name.message}
                        placeholder="Enter your name"
                        {...register("name", {
                            required:{
                              value: true,
                                message: "Name is required"
                            },
                        })}
                        />
                        <Input
                        label="Useremail: "
                        placeholder="Enter your email"
                        mess={errors.email && errors.email.message}
                        type="email"
                        {...register("email", {
                            required:{
                              value: true,
                              message: "Email is required"
                            } ,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Oops! Please enter a valid email address.",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        mess={errors.password && errors.password.message}
                        placeholder="Enter your password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })}
                        />
                        <Button type="submit" className="w-full bg-orange-400 hover:bg-orange-500">
                            Create Account
                        </Button>
                       
                    </div>
                </form>
                <h3 className="text-center m-2 dark:text-white ">OR</h3>
                        <Button className="w-full mb-4 flex justify-center items-center bg-transparent border border-black rounded-sm" textColor="text-black" onClick={()=>{   setLoading(true); authService.OAuthLogin()}} >
                   <img src={github}  alt="Google" width='50px' />
                   <p className="font-bold text-lg">Login with Github.</p>
             </Button>
           
             <Button  className="w-full flex justify-center items-center bg-transparent border border-black rounded-sm" textColor="text-black" onClick={()=>{  setLoading(true); authService.OAuthLogingoogle()}} >
             <img src={google} className="mx-3" alt="Google" width='30px' />
             <p className="font-bold text-lg ">Login with Google.</p>
             </Button>
            </div>

    </div>
  )
}

export default Signup