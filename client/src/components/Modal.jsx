import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import useAuth from '../hook/useAuth';
import useAxiosPublic from '../hook/useAxiosPublic';
import Swal from "sweetalert2"

const Modal = ({ nameModal }) => {
    const { login, signUpWithPopup } = useAuth();
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
        login(data.email, data.password)
            .then((reslt) => {
                const user = reslt.user;
                // console.log(user);
                document.getElementById(nameModal).close();
                Swal.fire({
                    title: "Sign In Successfully",
                    icon: "success",
                    timer: 1500,
                  })
                navigate(from, { replace: true });
            })
            .catch((error) => {
                document.getElementById(nameModal).close();
                Swal.fire({
                    title: "Cann't Sign In, Please try again",
                    icon: "error",
                })
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
                })
                Swal.fire({
                    title: "Google Sign In Successfully",
                    icon: "success",
                    timer: 1500,
                })
                document.getElementById(nameModal).close();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <dialog id={nameModal} className="modal modal-middle sm:modal-middle">
                <div className="modal-box p-12">
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
                        <button className='absolute right-4 top-4' onClick={() => document.getElementById(nameModal).close()}>
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
            </dialog>
        </div>
    )
}

export default Modal
