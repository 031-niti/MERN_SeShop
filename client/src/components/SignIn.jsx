import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from '../context/AuthProvider';

const SignIn = ({ name }) => {
  const { login, signUpWithPopup } = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((reslt) => {
        const user = reslt.user;
        // console.log(user);
        alert("Login Successful")
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const googleSignUp = () => {
    signUpWithPopup()
      .then((reslt) => {
        const user = reslt.user;
        alert("Google SignUp Successfully")
        document.getElementById("login").close();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
        <div className="max-w-md shadow w-full mx-auto my-20 border rounded-lg p-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-xl">Please Login</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required {...register("email")} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required {...register("password")} />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <button className="btn bg-red text-white w-full mt-6 mb-4" type="submit">
              Login
            </button>
          </form>
          <div className='text-center'>
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className='text-red'>
                Signup Now
              </Link>
            </p>
            <button className='absolute right-4 top-4' onClick={() => document.getElementById(name).close()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className='flex justify-center mt-6 space-x-2 '>
            <button className='btn btn-circle hover:bg-red hover:text-white duration-700' onClick={googleSignUp}>
              <FaGoogle />
            </button>
            <button className='btn btn-circle hover:bg-red hover:text-white duration-700'>
              <FaFacebookF />
            </button>
            <button className='btn btn-circle hover:bg-red hover:text-white duration-700'>
              <FaGithub />
            </button>
          </div>
        </div>
    </div>
  )
}

export default SignIn