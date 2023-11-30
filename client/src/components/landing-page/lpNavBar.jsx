import React from 'react'

const LpNavBar = () => {
    return (
        <div className='flex justify-between pt-4 font-tt-norms-pro w-[100%] px-12'> 
            <div className='flex items-center font-bold text-4xl text-light-secondary'>
                115A's Diner 
            </div>
            <div className='flex gap-x-2 font-bold'>
                <button className='px-3  text-black rounded-3xl leading-10'>Sign In</button>
                <button className='px-3 bg-light-secondary rounded-3xl leading-10 text-white'>Sign Up</button>
            </div>
        </div>
    )
}

export default LpNavBar