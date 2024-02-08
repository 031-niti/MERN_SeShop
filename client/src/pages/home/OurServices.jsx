import React from 'react';

const serviceslist = [
  {
    id: 1,
    title: "High-Quality Products",
    description: "We offer a curated selection of high-quality",
    image: "/images/home/services/assurance.png"
  },
  {
    id: 2,
    title: "Fast delivery",
    description: "We deliver your order promptly to your door",
    image: "/images/home/services/fast-delivery.png"
  },
  {
    id: 3,
    title: "Online Ordering",
    description: "Explore product & order with ease using our Online Ordering",
    image: "/images/home/services/order.png"
  },
  {
    id: 4,
    title: "Gift Cards",
    description: "Give the gift to exceptional dining with SE Shop Gift Cards",
    image: "/images/home/services/gift.png"
  },
];

const OurServices = () => {
  return (
    <div className='section-container mt-16'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
        <div className='md:w-1/2'>
          <div className='text-left md:w-4/5 space-y-5'>
            <p className='text-lg text-red uppercase font-semibold'>Our story & Services</p>
            <h2 className='text-4xl font-semibold'>Our Journey And Services</h2>
            <blockquote className='my-5 text-secondary leading-[30px]'>
              We provide a curated selection of high-quality tech-inspired products,
              backed by fast shipping and exceptional customer service. Our missionis 
              to empower and inspire tech enthusiasts through our carefully chosen
              merchandise and community engagement initiatices.
            </blockquote>
            <button className='btn bg-red rounded-full text-white px-8 py-2'>Explore</button>
          </div>
        </div>
        <div className='md:w-1/2'>
          <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center'>
            {serviceslist.map((service) => {
              return (
                <div key={service.id} className='shadow-lg drop-shadow-lg w-full h-52 border rounded-md p-2 hover:-translate-y-4 duration-300 transition-all'>
                  <div className='flex flex-col justify-center items-center'>
                    <img src={service.image} alt="" className='w-24 h-24' />
                    <h2 className='text-red text-lg'>{service.title}</h2>
                    <p className='text-[#833939] text-[15px] text-center mt-2'>{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
