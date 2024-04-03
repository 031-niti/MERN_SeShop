import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import useAxiosPbulic from '../../../hook/useAxiosPublic';

const AllProductItems = () => {
    const axiosPublic = useAxiosPbulic();
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await axiosPublic.get("/products");
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosPublic.delete(`/products/${_id}`);
                    if (response.status === 200) {
                        setItems(items.filter(item => item._id !== _id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#3085d6",
                        });
                        refetch();
                    }
                } catch (error) {
                    console.error("Error deleting item:", error);
                }
            }
        });
    };

    return (
        <div>
            <div>
                <p className='text-4xl font-semibold mb-8'>Manage All <span className='text-red'>Product Items!</span></p>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra ">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        #
                                    </label>
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th className='text-center '>Update</th>
                                <th className='text-center '>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th>
                                            <label>
                                                {index + 1 + indexOfFirstItem}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            ฿{item.price}
                                        </td>
                                        <th className='text-center '>
                                            <Link to={`/dashboard/update-item/${item._id}`} className="btn btn-ghost"><FaPenToSquare className='text-amber-500 w-6 h-6' /></Link>
                                        </th>
                                        <th className='text-center '>
                                            <button className="btn btn-ghost" onClick={() => handleDelete(item._id)}><RiDeleteBin6Line className='text-red w-6 h-6' /></button>
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="pagination mt-4 flex justify-center items-center space-x-2">
                    <button className='btn bg-red text-white' onClick={handlePrevPage} disabled={currentPage === 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        Previous
                    </button>
                    <button className='btn bg-red text-white' onClick={handleNextPage} disabled={indexOfLastItem >= items.length}>
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllProductItems;
