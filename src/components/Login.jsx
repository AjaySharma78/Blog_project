import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import github from "../assets/github.png";
import google from "../assets/google.png";
import { error as errorMsg } from "../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        if (!userData.emailVerification) {
          await authService.emailVerification();
          dispatch(
            errorMsg("Email has been send! Please verify your email address.")
          );
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  function handleNavigate() {
    navigate("/reset-password");
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-11/12 md:w-full max-w-lg bg-gray-100 rounded-xl p-5 md:p-10 border border-black/10 dark:bg-gray-900 dark:border-white`}
      >
        <div className="mb-2 flex justify-center items-center">
          <span className=" flex justify-center w-full max-w-[200px]">
            <Logo width="70px" />
          </span>
        </div>
        <h2 className="text-center text-lg md:text-2xl font-bold leading-tight dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-xs text-center md:text-base text-black/60 dark:text-white/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline dark:text-white"
          >
            Sign Up
          </Link>
        </p>
        {loading && (
          <div className="w-full grid place-content-center mt-2">
            <img
              className="w-[30px]"
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            />{" "}
          </div>
        )}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div>
            <Input
              label="Useremail: "
              placeholder="Enter your email"
              type="email"
              name="email"
              mess={errors.email ? errors.email.message : ""}
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Oops! Please enter a valid email address.",
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              name="password"
              mess={errors.password ? errors.password.message : ""}
              placeholder="Enter your password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            <button
              type="button"
              onClick={handleNavigate}
              className="bg-transparent px-0 md:px-0 py-0 md:py-0 mb-0 ml-1 text-sm dark:text-red-300 text-red-300"
            >
              Forgot Password?
            </button>
            <Button
              type="submit"
              className="w-full bg-orange-400 hover:bg-orange-500 mt-4"
            >
              Sign in
            </Button>
          </div>
        </form>

        <h3 className="text-center m-2 dark:text-white">OR</h3>

        <Button
          className="w-full flex mb-4 justify-center items-center bg-transparent border border-black rounded-sm "
          textColor="text-black"
          onClick={() => {
            setLoading(true);
            authService.OAuthLogin();
          }}
        >
          <img src={github} alt="Google" width="50px" />
          <p className="font-bold text-lg">Login with Github.</p>
        </Button>

        <Button
          className="w-full flex justify-center items-center bg-transparent border border-black rounded-sm "
          textColor="text-black"
          onClick={() => {
            setLoading(true);
            authService.OAuthLogingoogle();
          }}
        >
          <img src={google} className="mx-3" alt="Google" width="30px" />
          <p className="font-bold text-lg ">Login with Google.</p>
        </Button>
      </div>
    </div>
  );
}

export default Login;
