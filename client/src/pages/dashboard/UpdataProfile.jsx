import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../context/AuthProvider'

const UpdataProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";
    const { updateUserProfile } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        updateUserProfile({ name, photoURL })
            .then(() => {
                alert("Profile Updated!")
                navigate(from, { replace: true })
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className='container mx-auto my-20 w-full '>
            <div className='flex justify-center items-center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='border w-[30rem] py-10 px-16 rounded-xl shadow-xl drop-shadow my-20'>
                        <h3 className="font-bold text-xl">Upload Your Profile</h3>
                        <div className="form-control my-2">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name" className="input input-bordered" {...register("name")} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upload Profile Photo</span>
                            </label>
                            <input type="text" placeholder="Photo URL" className="input input-bordered" {...register("photoURL")} />
                        </div>
                        <button className="btn bg-red text-white w-full mt-10 mb-4" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdataProfile