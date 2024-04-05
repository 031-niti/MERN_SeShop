import React, { useState, useEffect } from 'react';
import { MdSave } from "react-icons/md";
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAxiosPbulic from '../../../hook/useAxiosPublic';

const UpdateItem = () => {
    const axiosPublic = useAxiosPbulic();
    //Hook useParams จาก react-router จะช่วยในการดึงค่าพารามิเตอร์ที่ถูกส่งมา
    const { id } = useParams();
    const [items, setItems] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
    })
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get(`/products/${id}`);
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setItems((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleUpdateItem = async (e) => {
        e.preventDefault();
        try {
            await axiosPublic.put(`/products/${id}`, items)
            console.log("Update ProductData:", items);
            Toast.fire({
                icon: "success",
                title: "Update Product Item Successfully"
            });
            navigate("/dashboard/all-product-items")
        } catch (error) {
            console.log(error);
        }
    }
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    return (
        <div>
            <p className='text-4xl font-semibold mb-8'>Update <span className='text-red'>Menu Item</span></p>
            <div className='px-2 space-y-8'>
                <div className='space-y-2 mb-14'>
                    <p>Product name*</p>
                    <input name="name" type="text" placeholder='Product name' className='input input-bordered w-full'
                        onChange={handleChange} value={items.name} />
                </div>
                <div className='flex items-center space-x-8'>
                    <div className='w-full space-y-2'>
                        <p>Category*</p>
                        <input name="category" type="text" placeholder='category' className='input input-bordered w-full' onChange={handleChange} value={items.category} />
                    </div>
                    <div className='w-full space-y-2'>
                        <p>Price*</p>
                        <input name="price" type="number" placeholder='Price' className='input input-bordered w-full' onChange={handleChange} value={items.price} />
                    </div>
                </div>
                <div className='space-y-2'>
                    <p>Product Details</p>
                    <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Product Details..." onChange={handleChange} value={items.description} ></textarea>
                </div>
                <div className='space-y-2'>
                    <p>Image URL*</p>
                    <input name="image" type="text" placeholder='Image URL' className='input input-bordered w-full' onChange={handleChange} value={items.image} />
                </div>
            </div>
            <button className='btn bg-red text-white mx-2 mt-4' onClick={handleUpdateItem}>Update Item <MdSave /></button>
        </div>
    )
}

export default UpdateItem;
