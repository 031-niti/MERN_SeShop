import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Card = ({ item }) => {
    const { _id, name, image, price, description } = item;
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const handleHeartClick = () => {
        setIsHeartFilled(true)
    }
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
                    <button className='btn bg-red text-white'>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card