import React from 'react'

const Testimonials = () => {
  return (
    <div className='section-container'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
        <div className='md:w-1/2'>
          <img src="./images/home/testimonials/testimonials.png" alt="" />
        </div>
        <div className='md:w-1/2'>
          <div className='text-left md:w-4/5 space-y-5'>
            <p className='text-lg text-red uppercase'>Testimonials</p>
            <h2 className='text-4xl font-semibold'>What Our Customers Say about us</h2>
            <blockquote className='my-5 text-secondary leading-[30px]'>
              "As a software developer, I'm always on the lookout for unique 
              accessories to express my love for coding. The keyboard ky keychain is 
              not only stylish but also durable. Will definitely be purchasing more items!"
            </blockquote>
            <div className='flex items-center gap-4 flex-wrap'>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial3.png" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="w-12 bg-red text-neutral-content">
                    <span>+99</span>
                  </div>
                </div>
              </div>
              <div className='space-y-1 '>
                <h5 className='text-lg font-semibold'>Customer Ferdback</h5>
                <div className='flex items-center gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0  0 20 20" fill="currentColor" class="w-5 h-5 text-yellow-500">
                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                  </svg>
                  <span className='font-semibold'>4.9</span>
                  <span className='text-[#907E7E]'>(18.6k Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials