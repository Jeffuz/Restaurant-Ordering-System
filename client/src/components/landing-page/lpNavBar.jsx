import React from 'react'

const LpNavBar = () => {
    return (
        <div className='flex justify-between pt-4 font-tt-norms-pro w-[100%] px-12'> 
            <div className='flex items-center font-bold text-4xl text-white'>
                115A's Diner 
            </div>
            <div className='flex gap-x-2 font-bold'>
                <button className='px-3 bg-light-primary text-white rounded-3xl leading-10'>Sign In</button>
                <button className='px-3 bg-light-senary rounded-3xl leading-10'>Sign Up</button>
            </div>
        </div>
    )
}

export default LpNavBar