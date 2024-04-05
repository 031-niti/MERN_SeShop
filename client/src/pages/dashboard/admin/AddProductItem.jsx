import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { MdSave } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import useAxiosPbulic from '../../../hook/useAxiosPublic';

const AddProductItem = () => {
    const axiosPublic = useAxiosPbulic();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
    })
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get("/products");
                setCategories([...new Set(res.data.map(item => item.category))]);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        fetchData();
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleAddProductItem = async (e) => {
        e.preventDefault();
        try {
            await axiosPublic.post("/products", product)
            console.log("Product data:", product);
            Toast.fire({
                icon: "success",
                title: "Add Product Item Successfully"
            });
            navigate("/dashboard/all-product-items")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <p className='text-4xl font-semibold mb-8'>Add A New <span className='text-red'>Product Item</span></p>
            <div className='px-2 space-y-8'>
                <div className='space-y-2 mb-14'>
                    <p>Product name*</p>
                    <input name="name" type="text" placeholder='Product name' className='input input-bordered w-full'
                        onChange={handleChange} value={product.name} />
                </div>
                <div className='flex items-center space-x-8'>
                    <div className='w-full space-y-2'>
                        <p>Category*</p>
                        <select name="category" className="select select-bordered w-full capitalize" onChange={handleChange} value={product.category}>
                            {categories.map((category, index) => {
                                return (
                                    <option key={index}>
                                        {category}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='w-full space-y-2'>
                        <p>Price*</p>
                        <input name="price" type="number" placeholder='Price' className='input input-bordered w-full' onChange={handleChange} value={product.price} />
                    </div>
                </div>
                <div className='space-y-2'>
                    <p>Product Details</p>
                    <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Product Details..." onChange={handleChange} value={product.description} ></textarea>
                </div>
                <div className='space-y-2'>
                    <p>Inage URL*</p>
                    <input name="image" type="text" placeholder='Inage URL' className='input input-bordered w-full' onChange={handleChange} value={product.image} />
                </div>
            </div>
            <button className='btn bg-red text-white mx-2 mt-4' onClick={handleAddProductItem}>Add Item<MdSave /></button>
        </div>
    )
}

export default AddProductItem