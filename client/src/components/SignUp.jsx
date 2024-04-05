import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from '../context/AuthProvider';

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then((reslt) => {
                const user = reslt.user;
                console.log(user);
                alert("Account create Successful");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className='flex flex-col items-center justify-center my-20'>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='border py-5 px-20 rounded-xl shadow-xl drop-shadow'>
                    <h3 className="font-bold text-xl">Create An Account</h3>
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
                    <div className='text-center'>
                        <p>
                            Have an account?{' '}
                            <button to="#" className='text-red' >
                                Login
                            </button>
                        </p>
                    </div>
                    <div className='flex justify-center mt-6 space-x-2 '>
                        <button className='btn btn-circle hover:bg-red hover:text-white duration-700'>
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
            </form>
        </div>
    )
}

export default SignUp