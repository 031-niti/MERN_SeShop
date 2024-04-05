import React from 'react'
import logo from '/logo.png'
import { Link, Outlet } from 'react-router-dom'
import { BiSolidDashboard } from "react-icons/bi";
import { IoBagCheck } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import useAdmin from '../hook/useAdmin';

const DashboardLayout = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    // const isAdmin = false;
    return (
        <div>
            {isAdmin ? (
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col container mx-auto my-10">
                        {/* Page content here */}
                        <div className='flex items-center justify-between mx-4'>
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                                <BiSolidDashboard />
                            </label>
                            <button className='btn btn-ghost sm:btn-sm md:btn-md lg:btn-lg sm:hidden flex items-center gap-2'>
                                Logout
                            </button>
                        </div>
                        <div className='mt-5 md:mt-2 mx-4'>
                            <Outlet />
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <li>
                                <Link to="/" className="flex justify-center items-center">
                                    <img src={logo} alt="" className='w-32' />
                                    <div className="badge badge-primary text-white">Admin</div>
                                </Link>
                            </li>
                            <hr />
                            <li>
                                <Link>
                                    <BiSolidDashboard />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <IoBagCheck />
                                    Manage Orders
                                </Link>

                            </li>
                            <li>
                                <Link to="/dashboard/add-product-item">
                                    <IoIosAddCircle />
                                    Add Product
                                </Link>

                            </li>
                            <li>
                                <Link to="/dashboard/all-product-items">
                                    <BiSolidDashboard />
                                    Manage Item
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/users">
                                    <FaUserCheck />
                                    All Users
                                </Link>
                            </li>

                            <li className='border-t-2'>
                                <Link>
                                    <BiSolidDashboard />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <FaShoppingCart />
                                    Product
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <FaLocationArrow />
                                    Orders Tracking
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <BsFillQuestionCircleFill />
                                    Customer Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (<div className='h-screen flex items-center justify-center'>
                <Link to="/" className='btn btn-error'>You are not an admin! Back to </Link>
            </div>)}

        </div>
    )
}

export default DashboardLayout