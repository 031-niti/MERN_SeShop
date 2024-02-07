import React from 'react'
const categoryItems = [
  {
    id: 1,
    title: "Clothing",
    description: "(86 item)",
    image: "/images/home/category/img1.jpg"
  },
  {
    id: 2,
    title: "Accessories",
    description: "(86 item)",
    image: "/images/home/category/img2.jpg"
  },
  {
    id: 3,
    title: "Gadgets",
    description: "(86 item)",
    image: "/images/home/category/img3.jpg"
  },
  {
    id: 4,
    title: "Swag",
    description: "(86 item)",
    image: "/images/home/category/img4.jpg"
  },
]

const Categories = () => {
  return (
    <div className='section-container pb-16'>
      <div className='text-center space-y-2'>
        <p className='text-lg'>Customer favorites</p>
        <h2 className='text-[#830109] text-4xl font-bold'>Popular Catagories</h2>
      </div>
      <div className='flex flex-col sm:flex-row flex-wrap gap-2 justify-around items-center mt-12'>
        {categoryItems.map((item, i) => (
          <div key={i} className="card w-72 bg-base-100 shadow-xl py-6 px-5 drop-shadow-lg border cursor-pointer hover:-translate-y-4 transition-all duration-200">
            <figure>
              <img src={item.image} alt="Shoes" className="rounded-full w-28 h-28 p-2 bg-[#830109]" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories