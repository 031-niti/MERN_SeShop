import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../hook/useCart'


const Cart = () => {
    const [cart, refetch] = useCart();
    const [items, setItems] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await axios.get("http://localhost:4000/carts");
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);
    const itemCount = items.reduce((total, currentItem) => total + 1, 0);
    const totalPrice = items.reduce((total, currentItem) => total + (currentItem.price * currentItem.quantity), 0).toFixed(2)
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
                    const response = await axios.delete(`http://localhost:4000/carts/${_id}`);
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

    const handleIncreaseQuantity = async (index) => {
        try {
            const updatedItem = { ...items[index], quantity: items[index].quantity + 1 };
            const response = await axios.put(`http://localhost:4000/carts/${updatedItem._id}`, updatedItem);
            setItems(prevState => {
                const newItems = [...prevState];
                newItems[index] = response.data;
                return newItems;
            });
        } catch (error) {
            console.log(error);
        }
    };
    // handleDecreaseQuantity
    const handleDecreaseQuantity = async (index) => {
        try {
            const updatedItem = { ...items[index], quantity: items[index].quantity - 1 };
            const response = await axios.put(`http://localhost:4000/carts/${updatedItem._id}`, updatedItem);
            setItems(prevState => {
                const newItems = [...prevState];
                newItems[index] = response.data;
                return newItems;
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
            <div className="py-24 items-center">
                <div className='space-y-7 px-4 mt-6'>
                    <h2 className='md:text-4xl text-4xl font-bold md:leading-snug leading-snug text-center py-10'>
                        Items Added to The <span className='text-red'>Cart</span>
                    </h2>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table table-lg text-center">
                                <thead>
                                    <tr className='bg-red text-white '>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price Per Unit</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td className='flex justify-center items-center '>
                                                    <img src={item.image} className='w-16 h-16 object-cover mask mask-squircle' />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>
                                                <div className="join">
                                                        <button className="join-item btn" onClick={() => handleDecreaseQuantity(index)} disabled={item.quantity === 0}>-</button>
                                                        <input type="number" className="join-item input w-16 text-center focus:outline-none right-0 border-none" value={item.quantity} />
                                                        <button className="join-item btn" onClick={() => handleIncreaseQuantity(index)}>+</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.price}฿
                                                </td>
                                                <td>
                                                    {item.price * item.quantity}฿
                                                </td>
                                                <td>
                                                    <button className='btn btn-ghost shadow-md hover:bg-inherit' onClick={() => handleDelete(item._id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#830109" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex mt-14'>
                            <div className="w-1/2 space-y-4">
                                <h4 className='font-semibold text-xl'>Customer Details</h4>
                                {user && (
                                    <>
                                        <p>Name: {user.displayName}</p>
                                        <p>Email: {user.email}</p>
                                        <p>User_id: {user.uid}</p>
                                    </>
                                )}
                            </div>
                            <div className="w-1/2 space-y-4">
                                <h4 className='font-semibold text-xl'>Shopping Detrails</h4>
                                <p>Total Items: {itemCount}</p>
                                <p>Total Price: {totalPrice}฿</p>
                                <button className='btn bg-red text-white'>Procceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart