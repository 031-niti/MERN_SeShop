import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import useAuth from '../hook/useAuth';
import useAxiosPublic from '../hook/useAxiosPublic';
import Swal from "sweetalert2"

const SignUp = () => {
    const { createUser, updateUserProfile, signUpWithPopup } = useAuth();
    const axiosPublic = useAxiosPublic();
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
                updateUserProfile(data.name, data.photoURL).then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                    };
                    axiosPublic.post("/users", userInfo).then((response) => {
                        console.log(response);
                        Swal.fire({
                            title: "Account created Successfully",
                            icon: "success",
                            timer: 1500,
                        })
                        navigate(from, { replace: true })
                    })
                })
                alert("Account create Successful");
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
                const userInfo = {
                    name: reslt.user?.displayName,
                    email: reslt.user?.email,
                    photoURL: reslt.user?.photoURL,
                };
                axiosPublic.post("/users", userInfo).then((response) => {
                    console.log(response);
                    Swal.fire({
                        title: "Google Sign Up Successfully",
                        icon: "success",
                        timer: 1500,
                    })
                    navigate(from, { replace: true })
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className='flex flex-col items-center justify-center my-20'>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='border w-[30rem] py-10 px-16 rounded-xl shadow-xl drop-shadow'>
                    <h3 className="font-bold text-xl">Create An Account</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="Name" placeholder="Name" className="input input-bordered" {...register("name")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" {...register("email")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" {...register("password")} />
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
                            <Link to="/" className='text-red' >
                                Login
                            </Link>
                        </p>
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
            </form>
        </div>
    )
}

export default SignUp