import axios from 'axios'
import React, { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import Swal from 'sweetalert2';
import useCart from '../hook/useCart'

const Card = ({ item }) => {
    const [cart, refetch] = useCart();  
    const { _id, name, image, price, description } = item;
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled)
    }
    const handleAddToCart = (item) => {
        const cartItem = {
            productId: item._id,
            name: item.name,
            email: user.email,
            price: item.price,
            image: item.image,
            quantity: 1,
        }
        if (user && user.email) {
            axios.post(`http://localhost:4000/carts`, cartItem)
                .then((response) => {
                    if (response) {
                        Swal.fire({
                            title: "Product added on the cart",
                            position: "center",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                });
        } else {
            Swal.fire({
                title: "Please login to add an item to your cart?",
                icon: "warning",
                position: "center",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                showConfirmButton: true,
                confirmButtonColor: "#3085b6",
                confirmButtonText: "login now",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { form: location } });
                };
            });
        }
    };
    return (
        <div className="card w-72 bg-base-100 shadow-xl relative mr-5 md:my-5">
            <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-red rounded-full ${isHeartFilled ? "text-rose-500" : "text-white"}`}
                onClick={handleHeartClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="cursor-pointer w-5 h-5">
                    <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                </svg>
            </div>
            <Link>
                <figure className=''>
                    <img src={image} alt="" className="md:h-72" />
                </figure>
            </Link>
            <div className="card-body items-center text-center">
                <Link>
                    <h2 className="card-title line-clamp-1">{name}</h2>
                </Link>
                <p className='line-clamp-2'>{description}</p>
                <div className="card-actions mt-2 items-center justify-between space-x-10">
                    <h5 className='font-semibold'>
                        {price} <span className='text-sm text-red'>฿</span>
                    </h5>
                    <button className='btn bg-red text-white' onClick={() => { handleAddToCart(item) }}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card